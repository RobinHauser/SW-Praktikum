from src.server.bo import Chat
from src.server.db import Mapper
import json



class ChatMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, chat_id):
        pass

    def insert(self, user_id, payload):     # Own User_ID and in Payload User_ID of the other User
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM chatrelation WHERE UserID={}".format(user_id)
        cursor.execute(command)
        chat_tuple = cursor.fetchall()


        self._cnx.commit()
        cursor.close()
        return result


    def update(self, message):
        pass

    def delete(self, message):
        pass

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass