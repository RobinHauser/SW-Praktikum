from backend.src.server.bo import Chat
from backend.src.server.db import Mapper
import json



class ChatMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self, user_id):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT ChatID FROM chatrelation WHERE UserID={user_id}')
        tuples = cursor.fetchall()

        if tuples is not None:
            for i in tuples:

                command = f'SELECT UserID FROM chatrelation WHERE ChatID={i[0]} AND UserID != {user_id}'
                cursor.execute(command)
                chat_tuple2 = cursor.fetchall()

                chat_tuple = chat_tuple2


                if chat_tuple is not None:
                    for j in chat_tuple:
                        command2 = f'SELECT * FROM user WHERE UserID={j[0]}'
                        cursor.execute(command2)
                        user_tuple = cursor.fetchall()
                        for user in user_tuple:
                            jsstr = f'{{"userID": "{user[0]}", "email": "{user[1]}", "displayName": "{user[2]}","profileImgUrl": "{user[3]}", "chatID": "{i[0]}"}}'
                            user_json = json.loads(jsstr)
                            result.append(user_json)
                            #TODO userID mit kleinem oder großem "u"?

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, chat_id):
        pass

    def insert(self, user_id, payload):     # Own User_ID and in Payload User_ID of the other User
        result = []
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT ChatID FROM chatrelation')
        tuples = cursor.fetchall()
        if len(tuples) == 0:
            chatid = 30001
            command1 = f'INSERT INTO chatrelation (ChatID ,UserID) VALUES (%s, %s) '  # TODO add insert Method
            data = (chatid, payload.get('UserID'))
            command2 = f'INSERT INTO chatrelation (ChatID, UserID) VALUES (%s, %s)'
            data2 = (chatid, user_id)
            cursor.execute(command1, data)
            cursor.execute(command2, data2)

        else:
            chatid = tuples[-1][0] + 1
            cursor.execute(f'SELECT ChatID FROM chatrelation WHERE UserID={user_id}')
            v1 = cursor.fetchall()
            for i in v1:
                cursor.execute(f'SELECT UserID FROM chatrelation WHERE ChatID={i[0]} AND UserID != {user_id}')
                v2 = cursor.fetchall()
                try:
                    for i in v2:
                        if int(i[0]) == int(payload.get('UserID')):
                            raise IndexError
                except IndexError:
                    result.append("Chat already exists")
                    return IndexError

            else:
                command1 = f'INSERT INTO chatrelation (ChatID ,UserID) VALUES (%s, %s) '
                data = (chatid, payload.get('UserID'))
                command2 = f'INSERT INTO chatrelation (ChatID, UserID) VALUES (%s, %s)'
                data2 = (chatid, user_id)
                cursor.execute(command1, data)
                cursor.execute(command2, data2)

        json.dumps(result)

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