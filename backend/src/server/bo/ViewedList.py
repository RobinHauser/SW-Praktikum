from backend.src.server.bo.BusinessObject import BusinessObject


class ViewedList(BusinessObject):
    def __init__(self):
        super().__init__("ViewList", [00000, 100000])  # TODO doesnt needed
        self.__viewed_users = []

    def get_viewed_users(self):
        return self.__viewed_users

    def add_user(self, user):
        self.__viewed_users.append(user)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = ViewedList()
        obj.set_id(dictionary["id"])
        obj.set_owner_id(dictionary["owner_id"])
        obj.set_blocked_users(dictionary["blocked_users"])
        return obj
