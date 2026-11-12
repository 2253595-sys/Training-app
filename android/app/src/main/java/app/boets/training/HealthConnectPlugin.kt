package app.boets.training

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.ActiveCaloriesBurnedRecord
import androidx.health.connect.client.records.ExerciseSessionRecord
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.records.TotalCaloriesBurnedRecord
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import kotlin.math.roundToInt
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

@CapacitorPlugin(name = "HealthConnect")
class HealthConnectPlugin : Plugin() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun handleOnDestroy() {
        scope.cancel()
        super.handleOnDestroy()
    }

    @PluginMethod
    fun getStatus(call: PluginCall) {
        val result = JSObject()
        result.put("availability", availability())
        call.resolve(result)
    }

    @PluginMethod
    fun getPermissions(call: PluginCall) {
        if (availability() != "available") {
            call.resolve(permissionObject(emptySet()))
            return
        }
        scope.launch {
            try {
                val granted = client().permissionController.getGrantedPermissions()
                call.resolve(permissionObject(granted))
            } catch (error: Exception) {
                call.reject("Не удалось проверить доступ Health Connect", error)
            }
        }
    }

    @PluginMethod
    fun requestAccess(call: PluginCall) {
        if (availability() != "available") {
            call.reject("Health Connect недоступен")
            return
        }
        val host = activity as? MainActivity
        if (host == null) {
            call.reject("Нет экрана приложения")
            return
        }
        host.requestHealthPermissions(REQUIRED) { granted ->
            call.resolve(permissionObject(granted))
        }
    }

    @PluginMethod
    fun readActivity(call: PluginCall) {
        if (availability() != "available") {
            call.reject("Health Connect недоступен")
            return
        }
        scope.launch {
            try {
                call.resolve(readSevenDays())
            } catch (error: SecurityException) {
                call.reject("Нет доступа к Health Connect", error)
            } catch (error: Exception) {
                call.reject("Не удалось прочитать Health Connect", error)
            }
        }
    }

    @PluginMethod
    fun openHealthConnectInstall(call: PluginCall) {
        val ctx = activity ?: context
        val market = Uri.parse(
            "market://details?id=$PROVIDER&url=healthconnect%3A%2F%2Fonboarding"
        )
        val intent = Intent(Intent.ACTION_VIEW).apply {
            setPackage("com.android.vending")
            data = market
            putExtra("overlay", true)
            putExtra("callerId", ctx.packageName)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            ctx.startActivity(intent)
        } catch (error: ActivityNotFoundException) {
            val web = Intent(
                Intent.ACTION_VIEW,
                Uri.parse("https://play.google.com/store/apps/details?id=$PROVIDER")
            ).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
            ctx.startActivity(web)
        }
        call.resolve()
    }

    @PluginMethod
    fun openHealthConnectSettings(call: PluginCall) {
        val ctx = activity ?: context
        val settings = Intent(HealthConnectClient.ACTION_HEALTH_CONNECT_SETTINGS).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        try {
            ctx.startActivity(settings)
        } catch (error: ActivityNotFoundException) {
            val launch = ctx.packageManager.getLaunchIntentForPackage(PROVIDER)
            if (launch != null) {
                launch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                ctx.startActivity(launch)
            } else {
                openHealthConnectInstall(call)
                return
            }
        }
        call.resolve()
    }

    private fun client(): HealthConnectClient = HealthConnectClient.getOrCreate(context)

    private fun availability(): String {
        return when (HealthConnectClient.getSdkStatus(context, PROVIDER)) {
            HealthConnectClient.SDK_AVAILABLE -> "available"
            HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED -> "update_required"
            else -> "unavailable"
        }
    }

    private suspend fun readSevenDays(): JSObject {
        val health = client()
        val granted = health.permissionController.getGrantedPermissions()
        val zone = ZoneId.systemDefault()
        val today = LocalDate.now(zone)
        val from = today.minusDays(6).atStartOfDay(zone).toInstant()
        val to = today.plusDays(1).atStartOfDay(zone).toInstant()
        val canSteps = granted.contains(STEPS)
        val canExercise = granted.contains(EXERCISE)
        val canActive = granted.contains(ACTIVE)
        val canTotal = granted.contains(TOTAL)

        val days = JSArray()
        for (offset in 6 downTo 0) {
            val day = today.minusDays(offset.toLong())
            val start = day.atStartOfDay(zone).toInstant()
            val end = day.plusDays(1).atStartOfDay(zone).toInstant()
            var steps = 0L
            if (canSteps) {
                val response = health.aggregate(
                    AggregateRequest(
                        metrics = setOf(StepsRecord.COUNT_TOTAL),
                        timeRangeFilter = TimeRangeFilter.between(start, end)
                    )
                )
                steps = response[StepsRecord.COUNT_TOTAL] ?: 0L
            }
            val row = JSObject()
            row.put("date", day.toString())
            row.put("steps", steps)
            days.put(row)
        }

        val sessions = JSArray()
        if (canExercise) {
            var token: String? = null
            do {
                val page = health.readRecords(
                    ReadRecordsRequest(
                        recordType = ExerciseSessionRecord::class,
                        timeRangeFilter = TimeRangeFilter.between(from, to),
                        pageToken = token
                    )
                )
                for (record in page.records) {
                    sessions.put(sessionObject(health, record, zone, canActive, canTotal))
                }
                token = page.pageToken
            } while (!token.isNullOrEmpty())
        }

        val result = JSObject()
        result.put("permissions", permissionObject(granted))
        result.put("days", days)
        result.put("sessions", sessions)
        return result
    }

    private suspend fun sessionObject(
        health: HealthConnectClient,
        record: ExerciseSessionRecord,
        zone: ZoneId,
        canActive: Boolean,
        canTotal: Boolean
    ): JSObject {
        val seconds = Duration.between(record.startTime, record.endTime).seconds.coerceAtLeast(0)
        val minutes = (seconds / 60.0).roundToInt()
        val obj = JSObject()
        obj.put("id", record.metadata.id)
        obj.put("type", exerciseTypeKey(record.exerciseType))
        obj.put("title", record.title ?: "")
        obj.put("date", record.startTime.atZone(zone).toLocalDate().toString())
        obj.put("start", DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(record.startTime.atZone(zone)))
        obj.put("end", DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(record.endTime.atZone(zone)))
        obj.put("durationMin", minutes)
        if (record.startTime.isBefore(record.endTime)) {
            if (canActive) {
                kcal(health, ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL, record.startTime, record.endTime)
                    ?.let { obj.put("activeKcal", it) }
            }
            if (canTotal) {
                kcal(health, TotalCaloriesBurnedRecord.ENERGY_TOTAL, record.startTime, record.endTime)
                    ?.let { obj.put("totalKcal", it) }
            }
        }
        return obj
    }

    private suspend fun kcal(
        health: HealthConnectClient,
        metric: androidx.health.connect.client.aggregate.AggregateMetric<androidx.health.connect.client.units.Energy>,
        start: Instant,
        end: Instant
    ): Int? {
        val response = health.aggregate(
            AggregateRequest(
                metrics = setOf(metric),
                timeRangeFilter = TimeRangeFilter.between(start, end)
            )
        )
        val energy = response[metric] ?: return null
        val value = energy.inKilocalories
        if (value < 1.0) return null
        return value.roundToInt()
    }

    private fun permissionObject(granted: Set<String>): JSObject {
        val obj = JSObject()
        obj.put("steps", granted.contains(STEPS))
        obj.put("exercise", granted.contains(EXERCISE))
        obj.put("totalCalories", granted.contains(TOTAL))
        obj.put("activeCalories", granted.contains(ACTIVE))
        return obj
    }

    private fun exerciseTypeKey(type: Int): String = when (type) {
        ExerciseSessionRecord.EXERCISE_TYPE_BADMINTON -> "badminton"
        ExerciseSessionRecord.EXERCISE_TYPE_BASEBALL -> "baseball"
        ExerciseSessionRecord.EXERCISE_TYPE_BASKETBALL -> "basketball"
        ExerciseSessionRecord.EXERCISE_TYPE_BIKING -> "biking"
        ExerciseSessionRecord.EXERCISE_TYPE_BIKING_STATIONARY -> "biking_stationary"
        ExerciseSessionRecord.EXERCISE_TYPE_BOOT_CAMP -> "boot_camp"
        ExerciseSessionRecord.EXERCISE_TYPE_BOXING -> "boxing"
        ExerciseSessionRecord.EXERCISE_TYPE_CALISTHENICS -> "calisthenics"
        ExerciseSessionRecord.EXERCISE_TYPE_CRICKET -> "cricket"
        ExerciseSessionRecord.EXERCISE_TYPE_DANCING -> "dancing"
        ExerciseSessionRecord.EXERCISE_TYPE_ELLIPTICAL -> "elliptical"
        ExerciseSessionRecord.EXERCISE_TYPE_EXERCISE_CLASS -> "exercise_class"
        ExerciseSessionRecord.EXERCISE_TYPE_FENCING -> "fencing"
        ExerciseSessionRecord.EXERCISE_TYPE_FOOTBALL_AMERICAN -> "football_american"
        ExerciseSessionRecord.EXERCISE_TYPE_FOOTBALL_AUSTRALIAN -> "football_australian"
        ExerciseSessionRecord.EXERCISE_TYPE_FRISBEE_DISC -> "frisbee_disc"
        ExerciseSessionRecord.EXERCISE_TYPE_GOLF -> "golf"
        ExerciseSessionRecord.EXERCISE_TYPE_GUIDED_BREATHING -> "guided_breathing"
        ExerciseSessionRecord.EXERCISE_TYPE_GYMNASTICS -> "gymnastics"
        ExerciseSessionRecord.EXERCISE_TYPE_HANDBALL -> "handball"
        ExerciseSessionRecord.EXERCISE_TYPE_HIGH_INTENSITY_INTERVAL_TRAINING -> "hiit"
        ExerciseSessionRecord.EXERCISE_TYPE_HIKING -> "hiking"
        ExerciseSessionRecord.EXERCISE_TYPE_ICE_HOCKEY -> "ice_hockey"
        ExerciseSessionRecord.EXERCISE_TYPE_ICE_SKATING -> "ice_skating"
        ExerciseSessionRecord.EXERCISE_TYPE_MARTIAL_ARTS -> "martial_arts"
        ExerciseSessionRecord.EXERCISE_TYPE_PADDLING -> "paddling"
        ExerciseSessionRecord.EXERCISE_TYPE_PARAGLIDING -> "paragliding"
        ExerciseSessionRecord.EXERCISE_TYPE_PILATES -> "pilates"
        ExerciseSessionRecord.EXERCISE_TYPE_RACQUETBALL -> "racquetball"
        ExerciseSessionRecord.EXERCISE_TYPE_ROCK_CLIMBING -> "rock_climbing"
        ExerciseSessionRecord.EXERCISE_TYPE_ROLLER_HOCKEY -> "roller_hockey"
        ExerciseSessionRecord.EXERCISE_TYPE_ROWING -> "rowing"
        ExerciseSessionRecord.EXERCISE_TYPE_ROWING_MACHINE -> "rowing_machine"
        ExerciseSessionRecord.EXERCISE_TYPE_RUGBY -> "rugby"
        ExerciseSessionRecord.EXERCISE_TYPE_RUNNING -> "running"
        ExerciseSessionRecord.EXERCISE_TYPE_RUNNING_TREADMILL -> "running_treadmill"
        ExerciseSessionRecord.EXERCISE_TYPE_SAILING -> "sailing"
        ExerciseSessionRecord.EXERCISE_TYPE_SCUBA_DIVING -> "scuba_diving"
        ExerciseSessionRecord.EXERCISE_TYPE_SKATING -> "skating"
        ExerciseSessionRecord.EXERCISE_TYPE_SKIING -> "skiing"
        ExerciseSessionRecord.EXERCISE_TYPE_SNOWBOARDING -> "snowboarding"
        ExerciseSessionRecord.EXERCISE_TYPE_SNOWSHOEING -> "snowshoeing"
        ExerciseSessionRecord.EXERCISE_TYPE_SOCCER -> "soccer"
        ExerciseSessionRecord.EXERCISE_TYPE_SOFTBALL -> "softball"
        ExerciseSessionRecord.EXERCISE_TYPE_SQUASH -> "squash"
        ExerciseSessionRecord.EXERCISE_TYPE_STAIR_CLIMBING -> "stair_climbing"
        ExerciseSessionRecord.EXERCISE_TYPE_STAIR_CLIMBING_MACHINE -> "stair_climbing_machine"
        ExerciseSessionRecord.EXERCISE_TYPE_STRENGTH_TRAINING -> "strength"
        ExerciseSessionRecord.EXERCISE_TYPE_STRETCHING -> "stretching"
        ExerciseSessionRecord.EXERCISE_TYPE_SURFING -> "surfing"
        ExerciseSessionRecord.EXERCISE_TYPE_SWIMMING_OPEN_WATER -> "swimming_open_water"
        ExerciseSessionRecord.EXERCISE_TYPE_SWIMMING_POOL -> "swimming_pool"
        ExerciseSessionRecord.EXERCISE_TYPE_TABLE_TENNIS -> "table_tennis"
        ExerciseSessionRecord.EXERCISE_TYPE_TENNIS -> "tennis"
        ExerciseSessionRecord.EXERCISE_TYPE_VOLLEYBALL -> "volleyball"
        ExerciseSessionRecord.EXERCISE_TYPE_WALKING -> "walking"
        ExerciseSessionRecord.EXERCISE_TYPE_WATER_POLO -> "water_polo"
        ExerciseSessionRecord.EXERCISE_TYPE_WEIGHTLIFTING -> "weightlifting"
        ExerciseSessionRecord.EXERCISE_TYPE_WHEELCHAIR -> "wheelchair"
        ExerciseSessionRecord.EXERCISE_TYPE_YOGA -> "yoga"
        else -> "other"
    }

    companion object {
        private const val PROVIDER = "com.google.android.apps.healthdata"
        private val STEPS = HealthPermission.getReadPermission(StepsRecord::class)
        private val EXERCISE = HealthPermission.getReadPermission(ExerciseSessionRecord::class)
        private val TOTAL = HealthPermission.getReadPermission(TotalCaloriesBurnedRecord::class)
        private val ACTIVE = HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class)
        val REQUIRED = setOf(STEPS, EXERCISE, TOTAL, ACTIVE)
    }
}
