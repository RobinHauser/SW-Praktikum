from server.bo.BusinessObject import BusinessObject
from server.bo.Property import Property
from server.bo.TextProperty import TextProperty
from server.bo.SelectionProperty import SelectionProperty
from server.bo.Information import Information

class Profile(BusinessObject):
    def __init__(self):
        super().__init__("Profile", [4001, 5000])
        self.assigned_infos = []

        # todo personal profile bool

