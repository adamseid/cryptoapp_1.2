from channels.generic.websocket import AsyncWebsocketConsumer
import json
import time
from . import requests
from .functions.shakepay_requests import ShakepayRequests

async def test(self):
	await self.send(text_data=json.dumps({
		'message': message,
	}))

class ChatRoomConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print(self.__dict__)
		print(self.channel_layer.__dict__)

		self.room_name = self.scope['url_route']['kwargs']['room_name']
		self.room_group_name = 'chat_%s' % self.room_name
		await self.channel_layer.group_add(self.room_group_name, self.channel_name)

		await self.accept()

		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'tester_message',
				'tester': 'hello world',
			}
		)
	
	async def tester_message(self, event):
		tester = event['tester']
		await self.send(text_data=json.dumps({
			'tester': tester,
		}))

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['request']
		print('\n', message)

		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'chatroom_message',
				'message': message,
			}
		)
		print('hi')

	async def chatroom_message(self, event):
		message = event['message']
		#asyncio.run(test(self))

		await self.send(text_data=json.dumps({
			'message': message,
		}))
	pass


class UpdateTables(AsyncWebsocketConsumer):

	async def connect(self):
		print(self.__dict__)
		print(self.channel_layer.__dict__)
		await self.accept()

	async def receive(self, text_data):
		message = json.loads(text_data)['message']
		print(message)

		await self.send(text_data=json.dumps({
			'message': message
			}))

		if message == 'update-tables':
			print('update-tables')
			await self.send(text_data=json.dumps({'message': message}))
		else:
			await self.send(text_data=json.dumps({'message': 'request not found'}))

class AdminPanel(AsyncWebsocketConsumer):
	async def connect(self):
		print(self.__dict__)
		print(self.channel_layer.__dict__)
		await self.accept()

	async def receive(self, text_data):
		request = json.loads(text_data)['request']
		print(request)

		if request == 'update-tables':
			print('update-tables')
			await self.send(text_data=json.dumps({'response': requests.updateTables('filename')}))
		elif request == 'NDAX':
			print('NDAX')
			await self.send(text_data=json.dumps({'response': requests.NDAX()}))
		else:
			await self.send(text_data=json.dumps({'response': 'request not found'}))


class NDAX(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

	async def receive(self, text_data):
		print(text_data)
		reqeust = json.loads(text_data)
		print(request)
		#request = json.loads(text_data)['request']

		await self.send(text_data=json.dumps({'response': request}))

class Shakepay(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

	async def receive(self, text_data):
		print(text_data)
		request = json.loads(text_data)['request']

		if request == 'update-tables':
			print('update-tables')
		
		if request == 'get-spreadsheets':
			print('get-spreadsheets')
			print(ShakepayRequests.getSpreadsheets())
			spreadsheets = ShakepayRequests.getSpreadsheets()
			response = 'success - Shakepay.getSpreadsheets()'
			data = spreadsheets
		
		if request == 'select-spreadsheet':

			filename = json.loads(text_data['data']['filename'])
			response = ShakepayRequests.selectSpreadsheet(filename)

			print('select-spreadsheet')
			response = json.loads(text_data)['request']
			data = json.loads(text_data)['data']
			print(data)
			ShakepayRequests.selectSpreadsheet(data)


		if request == 'update-spreadsheets':
			print('update-spreadsheets')
			filename = json.loads(text_data)['data']['filename']
			print(filename)

			response = ''
			data = ''



		await self.send(text_data=json.dumps({'response': response, 'data': data}))


