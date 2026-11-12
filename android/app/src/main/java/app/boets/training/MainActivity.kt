package app.boets.training

import android.os.Bundle
import androidx.activity.result.ActivityResultLauncher
import androidx.health.connect.client.PermissionController
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {
    private var pendingPermissions: ((Set<String>) -> Unit)? = null

    private val permissionLauncher: ActivityResultLauncher<Set<String>> =
        registerForActivityResult(PermissionController.createRequestPermissionResultContract()) { granted ->
            val callback = pendingPermissions
            pendingPermissions = null
            callback?.invoke(granted)
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(HealthConnectPlugin::class.java)
        super.onCreate(savedInstanceState)
    }

    fun requestHealthPermissions(permissions: Set<String>, callback: (Set<String>) -> Unit) {
        if (pendingPermissions != null) {
            callback(emptySet())
            return
        }
        pendingPermissions = callback
        permissionLauncher.launch(permissions)
    }
}
