from src.server.bo.BusinessObject import BusinessObject

class Bookmarklist(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__owner_id = 0
        self.__bookmarked_users = []

    def get_owner_id(self):
        return self.__owner_id

    def set_owner_id(self, owner_id):
        self.__owner_id = owner_id

    def get_bookmarked_users(self):
        return self.__bookmarked_users

    def set_bookmarked_users(self, *users):
        self.__bookmarked_users = [users]

    def __str__(self):
        return "Bookmarklist: {}, {}, {}".format(self._id, self.__owner_id, self.__bookmarked_users)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Bookmarklist()
        obj.set_id(dictionary["id"])
        obj.set_owner_id(dictionary["owner_id"])
        obj.set_bookmarked_users(dictionary["bookmarked_users"])
        return obj
