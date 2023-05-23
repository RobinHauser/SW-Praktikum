create table property
(
    PropertyID  int          not null primary key,
    Value       varchar(100) not null,
    is_Dropdown tinyint(1)   not null
);

create table information
(
    InformationID int          not null primary key,
    PropertyID    int          not null,
    Value         varchar(100) not null,
    constraint fk_information_property
        foreign key (PropertyID) references property (PropertyID)
);

create table user
(
    UserID          int           not null primary key,
    Email           varchar(100)  not null,
    Displayname     nvarchar(100) not null,
    DateOfBirth     nvarchar(100) not null,
    ProfileImageURL nvarchar(200) not null,
    BlocklistID     int           not null,
    BookmarklistID  int           not null,
    ProfileID       int           not null

    /*
    constraint fk_blocklist_property
        foreign key (BlocklistID) references blocklist (BlocklistID),
    constraint fk_bookmarklist_property
        foreign key (BookmarklistID) references bookmarklist (BookmarklistID),
    constraint fk_profile_property
        foreign key (ProfileID) references profile (ProfileID)

     */
);

create table blocklist
(
    BlocklistID int not null primary key,
    UserID      int not null,
    constraint fk_blocklist_user
        foreign key (UserID) references user (UserID)
);

create table block
(
    BlockID       int not null AUTO_INCREMENT primary key,
    BlocklistID   int not null,
    BlockedUserID int not null,
    constraint fk_block_user
        foreign key (BlockedUserID) references user (UserID),
    constraint fk_block_blocklist
        foreign key (BlocklistID) references blocklist (BlocklistID)
);
alter table block
    AUTO_INCREMENT = 33001;

create table bookmarklist
(
    BookmarklistID int not null primary key,
    UserID         int not null,
    constraint fk_bookmarklist_user
        foreign key (UserID) references user (UserID)
);

create table bookmark
(
    BookmarkID       int not null AUTO_INCREMENT primary key,
    BookmarklistID   int not null,
    BookmarkedUserID int not null,
    constraint fk_bookmark_user
        foreign key (BookmarkedUserID) references user (UserID),
    constraint fk_bookmark_bookmarklist
        foreign key (BookmarklistID) references bookmarklist (BookmarklistID)
);
alter table bookmark
    AUTO_INCREMENT = 22001;

create table chat
(
    ChatID    int not null primary key,
    UserOneID int not null,
    UserTwoID int not null,
    constraint fk_chat_user_one
        foreign key (UserOneID) references user (UserID),
    constraint fk_chat_user_two
        foreign key (UserTwoID) references user (UserID)
);

create table message
(
    MessageID int not null primary key,
    ChatID    int not null,
    constraint fk_message_chat
        foreign key (ChatID) references chat (ChatID)
);

create table profile
(
    ProfileID int not null primary key,
    UserID    int not null,
    constraint fk_profile_user
        foreign key (UserID) references user (UserID)
);

create table info_assignment
(
    AssignmentID  int not null AUTO_INCREMENT primary key,
    ProfileID     int not null,
    InformationID int not null,
    constraint fk_assignment_profile
        foreign key (ProfileID) references profile (ProfileID),
    constraint fk_assignment_information
        foreign key (InformationID) references information (InformationID)
);
alter table info_assignment
    AUTO_INCREMENT = 55001;

create table viewedlist
(
    ViewedListID int not null primary key,
    UserID       int not null,
    constraint fk_viewedlist_user
        foreign key (UserID) references user (UserID)
);

create table view
(
    ViewID       int not null primary key,
    ViewedListID int not null,
    UserID       int null,
    constraint fk_view_viewedlist
        foreign key (ViewedListID) references viewedlist (ViewedListID)
);



-- --------------------------------------------------------------------------------------

-- user erstellen
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1001, 'ek103@hdm-stuttgart.de', 'Elias Konson','03.02.2000', 'https://tbd.de', 4001, 2001, 3001);
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1002, 'rh086@hdm-stuttgart.de', 'Robin Hauser','03.12.2002', 'https://tbd.de', 4002, 2002, 3002);
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1003, 'bt036@hdm-stuttgart.de', 'Björn Till','31.12.2000', 'https://tbd.de', 4003, 2003, 3003);
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1004, 'tk172@hdm-stuttgart.de', 'Theo Klautke','08.08.2001', 'https://tbd.de', 4004, 2004, 3004);
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1005, 'mb396@hdm-stuttgart.de', 'Michael Bergdolt','31.12.2000', 'https://tbd.de', 4005, 2005, 3005);
insert into user (UserID, Email, Displayname, DateOfBirth, ProfileImageURL, ProfileID, BookmarklistID, BlocklistID)
values (1006, 'haug.jannik@gmail.com', 'Jannik Haug','09.12.2000', 'https://tbd.de', 4006, 2006, 3006);

-- blocklisten erstellen / zuweisen
insert into blocklist (BlocklistID, UserID)
VALUES (3001, 1001);
insert into blocklist (BlocklistID, UserID)
VALUES (3002, 1002);
insert into blocklist (BlocklistID, UserID)
VALUES (3003, 1003);
insert into blocklist (BlocklistID, UserID)
VALUES (3004, 1004);
insert into blocklist (BlocklistID, UserID)
VALUES (3005, 1005);
insert into blocklist (BlocklistID, UserID)
VALUES (3006, 1006);

-- bookmarklisten erstellen / zuweisen
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2001, 1001);
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2002, 1002);
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2003, 1003);
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2004, 1004);
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2005, 1005);
insert into bookmarklist (BookmarklistID, UserID)
VALUES (2006, 1006);

-- profile erstellen / zuweisen
insert into profile (ProfileID, UserID)
VALUES (4001, 1001);
insert into profile (ProfileID, UserID)
VALUES (4002, 1002);
insert into profile (ProfileID, UserID)
VALUES (4003, 1003);
insert into profile (ProfileID, UserID)
VALUES (4004, 1004);
insert into profile (ProfileID, UserID)
VALUES (4005, 1005);
insert into profile (ProfileID, UserID)
VALUES (4006, 1006);

-- properties erstellen
insert into property (PropertyID, Value, is_Dropdown)
VALUES (6001, 'Hair Color', 1);
insert into property (PropertyID, Value, is_Dropdown)
VALUES (6002, 'Height', 1);
insert into property (PropertyID, Value, is_Dropdown)
VALUES (6003, 'Smoker', 1);
insert into property (PropertyID, Value, is_Dropdown)
VALUES (6004, 'Religion', 1);

-- informations erstellen
insert into information (InformationID, PropertyID, Value)
VALUES (5001, 6001, 'Black');
insert into information (InformationID, PropertyID, Value)
VALUES (5002, 6001, 'Blond');
insert into information (InformationID, PropertyID, Value)
VALUES (5003, 6001, 'Brown');
insert into information (InformationID, PropertyID, Value)
VALUES (5004, 6001, 'Gray');
insert into information (InformationID, PropertyID, Value)
VALUES (5005, 6001, 'Red');

insert into information (InformationID, PropertyID, Value)
VALUES (5006, 6002, '< 150 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5007, 6002, '150 - 160 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5008, 6002, '160 - 170 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5009, 6002, '170 - 180 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5010, 6002, '180 - 190 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5011, 6002, '190 - 200 cm');
insert into information (InformationID, PropertyID, Value)
VALUES (5012, 6002, '> 200 cm');

insert into information (InformationID, PropertyID, Value)
VALUES (5013, 6003, 'Yes');
insert into information (InformationID, PropertyID, Value)
VALUES (5014, 6003, 'No');
insert into information (InformationID, PropertyID, Value)
VALUES (5015, 6003, 'Only when drunk');

insert into information (InformationID, PropertyID, Value)
VALUES (5016, 6004, 'Christianity');
insert into information (InformationID, PropertyID, Value)
VALUES (5017, 6004, 'Islam');
insert into information (InformationID, PropertyID, Value)
VALUES (5018, 6004, 'Judaism');
insert into information (InformationID, PropertyID, Value)
VALUES (5019, 6004, 'Hinduism');
insert into information (InformationID, PropertyID, Value)
VALUES (5020, 6004, 'Buddhism');
insert into information (InformationID, PropertyID, Value)
VALUES (5021, 6004, 'Atheism');

-- blocks erzeugen
insert into block (BlocklistID, BlockedUserID)
VALUES (3002, 1004); -- robin blockt theo
insert into block (BlocklistID, BlockedUserID)
VALUES (3005, 1001);
-- michi blockt elias

-- bookmarks erzeugen
insert into bookmark (BookmarklistID, BookmarkedUserID)
VALUES (2004, 1003); -- theo merkt björn
insert into bookmark (BookmarklistID, BookmarkedUserID)
VALUES (2006, 1005);
-- jannik merkt michi

-- infos zuweisen
insert into info_assignment (ProfileID, InformationID)
VALUES (4003, 5006); -- björn ist unter 150cm
insert into info_assignment (ProfileID, InformationID)
VALUES (4006, 5020); -- jannik ist buddhist
insert into info_assignment (ProfileID, InformationID)
VALUES (4001, 5005); -- elias hat rote haare
insert into info_assignment (ProfileID, InformationID)
VALUES (4004, 5012); -- theo ist über 2 meter

