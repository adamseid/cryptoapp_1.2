from .functions.NDAX import UpdateTables as UpdateTablesNDAX
from .functions import NDAX


def updateTables(filename):
	try:
		NDAX.UpdateTables.test()
		return('ok')
	except:
		return('not ok')

def NDAX():
	try:
		print('NDAX (requests)')
		UpdateTablesNDAX.updateRawCoinData()
		print('hi')
		return('NDAX')
	except:
		return('not ok')