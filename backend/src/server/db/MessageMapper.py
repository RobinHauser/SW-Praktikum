from server.bo import Message
from server.db import Mapper


class MessageMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
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

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM message WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id) = tuples[0]
            message = Message()
            message.set_id(id)
            result = message
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, message):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM message")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            message.set_id(maxid[0] + 1)

        command = "INSERT INTO message (id, timestamp, message_content, sender, receiver) VALUES (%s,%s,%s,%s,%s)"
        data = (message.get_id(), message.get_timestamp(), message.get_message_content(), message.get_sender(),
                message.get_receiver())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return message

    def update(self, message):
        cursor = self._cnx.cursor()

        command = "UPDATE message SET timestamp=%s, message_content=%s, sender=%s, receiver=%s WHERE id=%s"
        data = (message.get_timestamp(), message.get_message_content(), message.get_sender(), message.get_receiver(),
                message.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, message):
        cursor = self._cnx.cursor()

        command = "DELETE FROM message WHERE id={}".format(message.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass