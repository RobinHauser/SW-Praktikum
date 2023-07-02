from src.server.bo.BusinessObject import BusinessObject


class ViewedList(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__viewed_users = []

    def get_viewed_users(self):
        return self.__viewed_users

    def add_user(self, user):
        self.__viewed_users.append(user)

