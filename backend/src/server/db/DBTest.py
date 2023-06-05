import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="SoPra_2023"
)

print(mydb)