from src.server.bo.BusinessObject import BusinessObject as bo
from src.server.bo.User import User


class Message(bo):
    def __init__(self):
        super().__init__()
        self.__timestamp = ""
        self.__message_content = ""
        self.__sender = User.get_id()
        self.__receiver = User.get_id()

    def get_timestamp(self):
        return self.__timestamp

    def set_timestamp(self, timestamp):
        self.__timestamp = timestamp

    def get_message_content(self):
        return self.__message_content

    def set_message_content(self, message_content):
        self.__message_content = message_content

    def get_sender(self):
        return self.__sender

    def set_sender(self, sender):
        self.__sender = sender

    def get_receiver(self):
        return self.__receiver

    def set_receiver(self, receiver):
        self.__receiver = receiver
