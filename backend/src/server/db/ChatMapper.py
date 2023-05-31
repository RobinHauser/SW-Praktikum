from src.server.bo import Chat
from src.server.db import Mapper
import json



class ChatMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self, user_id):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT ChatID FROM chatrelation WHERE UserID={user_id} OR UserID2={user_id}')
        tuples = cursor.fetchall()

        if tuples is not None:
            for i in tuples:

                command = f'SELECT UserID FROM chatrelation WHERE ChatID={i[0]} AND UserID2={user_id}'
                cursor.execute(command)
                chat_tuple2 = cursor.fetchall()

                command1 = f'SELECT UserID2 FROM chatrelation WHERE ChatID={i[0]} AND UserID={user_id}'
                cursor.execute(command1)
                chat_tuple1 = cursor.fetchall()

                chat_tuple = chat_tuple1 + chat_tuple2


                if chat_tuple is not None:
                    for j in chat_tuple:
                        if j[0] != user_id:
                            command2 = f'SELECT * FROM user WHERE UserID={j[0]}'
                            cursor.execute(command2)
                            user_tuple = cursor.fetchall()
                            for user in user_tuple:
                                jsstr = f'{{"UserID": "{user[0]}", "email": "{user[1]}", "displayname": "{user[2]}", "dateOfBirth": "{user[3]}"' \
                                        f', "ProfileIMGURL": "{user[4]}", "ChatID": "{i[0]}"}}'
                                user_json = json.loads(jsstr)
                                result.append(user_json)




        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, chat_id):
        pass

    def insert(self, user_id, payload):     # Own User_ID and in Payload User_ID of the other User
        result = []
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT ChatID FROM chatrelation WHERE UserID={user_id} OR UserID2={user_id}')
        tuples = cursor.fetchall()

        if tuples is not None:
            for i in tuples:

                command = f'SELECT UserID FROM chatrelation WHERE ChatID={i[0]} AND UserID2={user_id}'
                cursor.execute(command)
                chat_tuple2 = cursor.fetchall()

                command1 = f'SELECT UserID2 FROM chatrelation WHERE ChatID={i[0]} AND UserID={user_id}'
                cursor.execute(command1)
                chat_tuple1 = cursor.fetchall()

                chat_tuple = chat_tuple1 + chat_tuple2

                for i in chat_tuple:
                    if int(i[0]) != int(payload.get('UserID')):

                        command = "INSERT INTO chatrelation (UserID, UserID2) VALUES (%s, %s)"  #TODO add insert Method
                        data = (user_id, payload.get('UserID'))
                        cursor.execute(command, data)
                    else:
                        pass

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