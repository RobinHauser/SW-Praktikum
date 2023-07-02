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

create index chatrelation_chatcontainer_ChatID_fk
    on chatrelation (ChatID);

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
    constraint chatcontainer_chatrelation_ChatID_fk
        foreign key (ChatID) references chatrelation (ChatID),
    constraint fk_chatcontainer_message
        foreign key (MessageID) references message (MessageID)
);

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


-- ---------------------------------------------------------------------------------------------------

insert into property (PropertyID, Name, IsSelection, Description) VALUES (6001, 'Nachname', 0, 'Wie lautet Dein Nachname?');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6002, 'Vorname', 0, 'Wie lautet Dein Vorname?');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6003, 'Geburtsdatum', 0, 'Wann ist Dein Geburtstag? Bitte gib ihn im folgenden Format an: 22 März 2001');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6004, 'Haarfarbe', 1, 'Gib hier Deine Haarfarbe an:');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6005, 'Körpergröße', 1, 'Gib hier Deine Größe in cm an.');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6006, 'Raucher', 1, 'Rauchst Du? Gib Hier Dein Rauchverhalten an.');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6007, 'Religion', 1, 'Gib hier Deine Religion oder Deinen Glauben an.');
