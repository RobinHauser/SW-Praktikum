from server.bo import BusinessObject as bo

class Blocklist(bo):
    def __init__(self):
        super().__init__()
        self.__list_of_users = []