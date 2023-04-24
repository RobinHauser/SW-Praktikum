from server.bo import BusinessObject as bo
from server.bo.User import User

class Message(bo):
    def __init__(self):
        super().__init__()
        self.__timestamp = ""
        self.__message_content = ""
        self.__sender = User
        self.__receiver = User


    def get_timestamp(self):
        return self.__timestamp

    def set_timestamp(self, timestamp):
        self.__timestamp = timestamp

    def get_message_content(self):
        return self.__message_content

    def set_message_content(self, message_content):
        self.__message_content = message_content

