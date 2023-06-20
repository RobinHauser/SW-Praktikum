create table profile
(
    ProfileID  int        not null
        primary key,
    IsPersonal tinyint(1) not null
);

create table property
(
    PropertyID  int                          not null
        primary key,
    Name        varchar(100) charset utf8mb3 not null,
    IsSelection tinyint(1)                   not null,
    Description varchar(200)                 not null
);

create table property_assignment
(
    ValueID    int not null
        primary key,
    PropertyID int not null,
    constraint fk_assignment_to_property
        foreign key (PropertyID) references property (PropertyID)
);

create table occupancies
(
    ValueID int                          not null
        primary key,
    Value   varchar(100) charset utf8mb3 not null,
    constraint fk_occupancies_to_assignment
        foreign key (ValueID) references property_assignment (ValueID)
);

create table information
(
    InformationID int not null
        primary key,
    ProfileID     int not null,
    ValueID       int not null,
    constraint fk_information_to_characteristics
        foreign key (ValueID) references occupancies (ValueID),
    constraint fk_information_to_profile
        foreign key (ProfileID) references profile (ProfileID)
);

create table user
(
    UserID      int auto_increment
        primary key,
    Email       varchar(100) charset utf8mb3  not null,
    Displayname varchar(100) charset utf8mb3  not null,
    AvatarURL   varchar(1000) charset utf8mb3 not null
);

create table blocklist
(
    BlocklistID int auto_increment
        primary key,
    UserID      int not null,
    constraint fk_blocklist_user
        foreign key (UserID) references user (UserID)
);

create table block
(
    BlockID       int auto_increment
        primary key,
    BlocklistID   int not null,
    BlockedUserID int not null,
    constraint fk_block_blocklist
        foreign key (BlocklistID) references blocklist (BlocklistID),
    constraint fk_block_user
        foreign key (BlockedUserID) references user (UserID)
);

create table bookmarklist
(
    BookmarklistID int auto_increment
        primary key,
    UserID         int not null,
    constraint fk_bookmarklist_user
        foreign key (UserID) references user (UserID)
);

create table bookmark
(
    BookmarkID       int auto_increment
        primary key,
    BookmarklistID   int not null,
    BookmarkedUserID int not null,
    constraint fk_bookmark_bookmarklist
        foreign key (BookmarklistID) references bookmarklist (BookmarklistID),
    constraint fk_bookmark_user
        foreign key (BookmarkedUserID) references user (UserID)
);

create table chatrelation
(
    ChatID               int not null,
    UserID               int not null,
    UserRelationToChatID int auto_increment
        primary key,
    constraint chatrelation_user_UserID_fk
        foreign key (UserID) references user (UserID)
);

create index chatrelation_user_UserID_fk2
    on chatrelation (UserID);



create table message
(
    MessageID int auto_increment
        primary key,
    Sender    int          null,
    Content   varchar(500) null,
    TimeStamp datetime     not null,
    constraint fk_message_user
        foreign key (Sender) references user (UserID)
);

create table chatcontainer
(
    ChatRelationID int auto_increment
        primary key,
    ChatID         int not null,
    MessageID      int not null,
    constraint fk_chatcontainer_message
        foreign key (MessageID) references message (MessageID)
);

create index chatcontainer_chatrelation_ChatID_fk
    on chatcontainer (ChatID);


create table profile_relation
(
    ProfileID int not null
        primary key,
    UserID    int not null,
    constraint fk_profile_rel_to_profile
        foreign key (ProfileID) references profile (ProfileID),
    constraint fk_profile_rel_to_user
        foreign key (UserID) references user (UserID)
);

create table viewedlist
(
    ViewedListID int auto_increment
        primary key,
    UserID       int not null,
    constraint fk_viewedlist_user
        foreign key (UserID) references user (UserID)
);

create table view
(
    ViewID       int auto_increment
        primary key,
    ViewedListID int not null,
    UserID       int null,
    constraint fk_view_viewedlist
        foreign key (ViewedListID) references viewedlist (ViewedListID)
);


----------------------------------------------------------------------------------------------------
# Befüllung
-- user erstellen
insert into user (UserID, Email, Displayname, AvatarURL) values (1001, 'ek103@hdm-stuttgart.de', 'Elias', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1002, 'rh086@hdm-stuttgart.de', 'Robin', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1003, 'bt036@hdm-stuttgart.de', 'Björn', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1004, 'tk172@hdm-stuttgart.de', 'Theo', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1005, 'mb396@hdm-stuttgart.de', 'Michael', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1006, 'haug.jannik@gmail.com', 'Jannik', 'tbd.de');

-- blocklisten erstellen / zuweisen
insert into blocklist (BlocklistID, UserID) VALUES (3001, 1001);
insert into blocklist (BlocklistID, UserID) VALUES (3002, 1002);
insert into blocklist (BlocklistID, UserID) VALUES (3003, 1003);
insert into blocklist (BlocklistID, UserID) VALUES (3004, 1004);
insert into blocklist (BlocklistID, UserID) VALUES (3005, 1005);
insert into blocklist (BlocklistID, UserID) VALUES (3006, 1006);

-- bookmarklisten erstellen / zuweisen
insert into bookmarklist (BookmarklistID, UserID) VALUES (2001, 1001);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2002, 1002);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2003, 1003);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2004, 1004);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2005, 1005);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2006, 1006);

-- blocks erzeugen
insert into block (BlocklistID, BlockedUserID) VALUES (3002, 1004); -- robin blockt theo
insert into block (BlocklistID, BlockedUserID) VALUES (3005, 1001); -- michi blockt elias

-- bookmarks erzeugen
insert into bookmark (BookmarklistID, BookmarkedUserID) VALUES (2004, 1003); -- theo merkt björn
insert into bookmark (BookmarklistID, BookmarkedUserID) VALUES (2006, 1005); -- jannik merkt michi

-- Messages befüllen
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20001, 1004, 'Hallo', '2023-02-10 12:00:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20002, 1003, 'Heyy', '2023-02-10 12:00:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20003, 1004, 'Wie gehts dir', '2023-02-10 12:01:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20004, 1003, 'Gut soweit und dir?', '2023-02-10 12:01:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20005, 1004, 'Gut, danke der Nachfrage', '2023-02-10 12:05:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20006, 1004, 'Lass treffen?', '2023-02-10 12:10:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20007, 1003, 'WTF?', '2023-02-10 12:20:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20008, 1004, 'Ja so auf entspannt', '2023-02-10 12:40:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20009, 1003, 'Achso ja oke', '2023-02-10 12:50:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20010, 1003, '20Uhr kannst mich abholen', '2023-02-10 12:56:00');

-- Chatrelation befüllen
INSERT INTO chatrelation (ChatID, UserID) VALUES (30001, 1004);
INSERT INTO chatrelation (ChatID, UserID) VALUES (30001, 1003);

-- Chatcontainer befüllen
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20001);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20002);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20003);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20004);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20005);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20006);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20007);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20008);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20009);
INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20010);


-- viewlist befüllen
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15001, 1001);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15002, 1002);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15003, 1003);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15004, 1004);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15005, 1005);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15006, 1006);


-- view befüllen
INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16001, 15001, 1004);
INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16002, 15004, 1002);
INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16003, 15004, 1003);

