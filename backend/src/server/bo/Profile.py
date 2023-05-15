from BusinessObject import BusinessObject
from Property import Property
from TextProperty import TextProperty
from SelectionProperty import SelectionProperty
from Information import Information

class Profile(BusinessObject):
    def __init__(self):
        super().__init__("Profile", [4001, 5000])
        self.assigned_infos = []

        # todo personal profile bool

