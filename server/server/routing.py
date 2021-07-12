from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import websocket.routing
import administrator.routing

application = ProtocolTypeRouter({
	'websocket': AuthMiddlewareStack(
		URLRouter(
			websocket.routing.websocket_urlpatterns,
		)
	),
	'administrator': AuthMiddlewareStack(
		URLRouter(
			administrator.routing.websocket_urlpatterns,
		)
	),
})




