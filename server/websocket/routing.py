from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
	#re_path(r'ws/websocket/(?P<room_name>\w+)/$', consumers.ChatRoomConsumer()),
	re_path(r'ws/websocket/update-tables', consumers.UpdateTables()),
	re_path(r'ws/websocket/admin-panel', consumers.AdminPanel()),
	re_path(r'ws/websocket/NDAX', consumers.NDAX()),
	re_path(r'ws/websocket/Shakepay', consumers.Shakepay())
]




