from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio



class UpdateTables(AsyncWebsocketConsumer):
	async def connect(self):
		print(self.__dict__)
		print(self.channel_layer.__dict__)
		await self.accept()

	pass

