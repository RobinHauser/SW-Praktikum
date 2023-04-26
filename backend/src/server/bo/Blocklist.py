from server.bo import BusinessObject as bo


class Blocklist(bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self.__list_of_users = []


def get_list_of_users(self):
    return self.__list_of_users


def set_list_of_users(self, list_of_users):
    self.__list_of_users = list_of_users
