import os
import numpy as np
import pandas as pd


root_dir = 'D:/Project/Crypto App/cryptoapp_1.2/'
ledger_dir = 'database/tables/fund_ledger/NDAX/'
ledger_name = '2021-6-15.xlsx'

filename = None


def getSpreadsheets():
	print('getSpreadsheets')
	print(os.listdir(root_dir + ledger_dir))
	files_in_dir = os.listdir(root_dir + ledger_dir)
	return files_in_dir


def selectSpreadsheet(filename):
	filename = filename
	print('filename', filename)
	return filename