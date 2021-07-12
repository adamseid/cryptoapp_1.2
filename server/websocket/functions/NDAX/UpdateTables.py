import os
import numpy as np
import pandas as pd


root_dir = 'D:/Project/Crypto App/cryptoapp_1.2/'
ledger_dir = 'database/tables/fund_ledger/NDAX/'
ledger_name = '2021-6-15.xlsx'

def test():
	print('test')
	print(os.listdir(root_dir + ledger_dir))
	return('test')

def getSymbol(ledger):
	symbol = ledger['asset']
	symbol = list(dict.fromkeys(symbol))
	symbol = [x for x in symbol if str(x) != 'nan']
	return symbol


def updateRawCoinData():
	print('updateRawCoinData()')
	ledger = pd.read_excel(root_dir + ledger_dir + ledger_name)
	print(ledger)
	symbol = getSymbol(ledger)
	print(symbol)




	return 0


