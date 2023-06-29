from src.server.bo import Message
from src.server.db import Mapper
import json
Message = Message.Message


class MessageMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param no param needed
        :return: all messages
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM message")
        tuples = cursor.fetchall()

        for (id, timestamp, message_content, sender, receiver) in tuples:
            message = Message()
            message.set_id(id)
            message.set_timestamp(timestamp)
            message.set_message_content(message_content)
            message.set_sender(sender)
            message.set_receiver(receiver)
            result.append(message)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, chat_id):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param chat_id: chat_id of the chat of which we want the messages
        :return: list of all messages in a unique chat container
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM chatcontainer WHERE ChatID={}".format(chat_id)
        cursor.execute(command)
        message_tuple = cursor.fetchall()

        if message_tuple is not None:
            messaage = []
            for i in message_tuple:
                messaage.append(i[2])
            v1 = []
            for i in messaage:
                command2 = "SELECT * FROM message WHERE MessageID={}".format(i)
                cursor.execute(command2)
                messages = cursor.fetchall()
                v1.append(messages)

            if v1 is not None:
                for message in v1:
                    for i in message:
                        jsstr = f'{{"messageID": {i[0]}, "senderID": {i[1]}, "content": "{i[2]}", "timeStamp": "{i[3]}"}}'
                        message_json = json.loads(jsstr)
                        result.append(message_json)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user_id, payload):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param user_id: the unique id of the user
        :return: entry of new chat in database
        """
        cursor = self._cnx.cursor()

        command3 = f'SELECT * FROM blocklist WHERE UserID={payload.get("UserID")}'
        cursor.execute(command3)
        v3 = cursor.fetchall()
        command4 = f'SELECT * FROM block WHERE BlocklistID= {v3[0][0]}'
        cursor.execute(command4)
        v4 = cursor.fetchall()
        for i in v4:
            if int(i[2]) == int(user_id):
                return IndexError

        command = "INSERT INTO message (Sender, Content, Timestamp) VALUES (%s, %s, %s)"
        data = (user_id, payload.get('Content'), payload.get('TimeStamp'))
        cursor.execute(command, data)

        command1 = f' SELECT MessageID FROM message WHERE Sender={user_id}'
        cursor.execute(command1)
        message_id = cursor.fetchall()

        command2 = "INSERT INTO chatcontainer (ChatID, MessageID) VALUES (%s, %s)"
        print(message_id[-1][0])
        data2 = (int(payload.get('ChatID')), message_id[-1][0])
        cursor.execute(command2, data2)

        self._cnx.commit()
        cursor.close()

        return payload

    def update(self, message):
        pass

    def delete(self, message):
        pass

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass