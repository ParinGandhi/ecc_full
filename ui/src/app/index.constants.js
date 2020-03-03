(function () {
  'use strict';

  angular
    .module('ptabe2e')
    .constant('CONSTANTS', {
      'WORKSPACE': {
        'DEFAULT': {
          title: "Default Workspace",
          structure: "12",
          defaultIndicator: true,
          identifier: "1"
        }
      },
      'URL': {
        'BASE': '/SkyTechUIDemo',
        'WHO_AM_I': '/kerb/who-am-i',
        'DEFAULTS': 'defaults',
        'CHANNELINFO':'/user-management/channel-info',
        'USER_WORKSPACE': '/user-workspaces/',
        'USER_WORKSPACE_WITH_PARAM': '/user-workspaces?',
        'WIDGETS': '/widgets',
        'USERDETAILEDDATA': '/user-management/user-data?userWorkerNumber=',
        'ASSIGNEEDETAILS': '/user-management/user-data?userIdentiifier=',
        'JUDGERELATIONSHIP': '/related-judge-attorney/?activeIn=A',
        'ASSOCIATEJUDGE': '/related-judge-attorneys',
        'ATTRONEYLIST': '/user-management/attorneys/',
        'EXTERNALURLS': '/reference-data/data-urls',
        'MY_CREDITS': '/credits-views/advancedsearch?',
        'MY_CREDITS_TIMEFRAME': '/credits-views/timeframes',
        'MY_CREDITS_SEARCH': '/credits-views/advancedsearch',
        'MY_TEAM_CREDITS': '/credits-views/my-team/',
        'MY_GROUP_CREDITS': '/credits-views/my-group/',
        'MY_CREDITS_GETLEAD': '/credits/get-lead/',
        'MY_CREDITS_REQUESTDU': '/credits/request-decisional-units',
        'MY_CREDITS_HISTORY': '/credits-history',
        'UPDATE_CREDITS': '/mycredits',
        'PGA_USER_GET': '/prodn-goal-adjust?requestorUserId=',
        'PGA_USER_AUDIT_LOG': '/prodn-goal-adjust?requestorUserId=',
        'USER_WORKSPACE_WIDGET': '/user-workspace-widgets/',
        'LAYOUT_CHANGE': 'layout',
        'DECISIONDATA': '/appeal-decision/data',
        'USER_FAVORITES': '/user-favorites/',
        'USER_WORKSPACE_ID': 'userWorkspaceIdentifier=',
        'SYSTEM_STATUS_RSS_FEED': '/system-status?feedType=SystemStatus',
        'PLANNED_EVENTS_RSS_FEED': '/system-status?feedType=PlannedEvents',
        'ANNOUNCEMENTS': '/announcements?',
        'REPORTCENTER': '/reports/employee/',
        'MILESTONEDATES': '/reports/milestone-dates',
        'THREEJUDGES': '/reports/judges-pending-cases',
        'PRELIMINARYRESPONSE': '/reports/waived-cases',
        'AVERAGEPENDENCY': '/reports/average-pendency',
        'ASSIGNEDAPJ': '/reports/assigned-cases/',
        'BY_ZONES': 'by-zones/',
        'USERMANAGEMENT': '/user-management/user-info',
        'SHOW_HIDE_COLUMNS': '/user-workspace-widgets/columns/',
        'ASSIGNMENTTYPE': '/fetch-assignment-type',
        'ROLETYPE': '/reference-data/user-roles',
        'ASSIGNEDTO': '/user-management/users?',
        'ASSIGNEEUSERS': '/user-management/assignees/',
        'PANELADMINISTRATORS': '/user-management/user-privileges?',
        'DEAFULTS': '/user-management/user-info?loginId=',
        //import Manager URL's
        // 'IMPORTMANAGER': '/import-manager/bulk',
        'IMPORTMANAGER': '/import-manager/preappeal-bulk',
        'IMPORT_BULK_REASSIGN': '/assignments/bulk-reassign',
        'IMPORT_VALIDATE_NNUMBER': '/import-manager/validate-application?applicationNumber=',
        'IMPORT_PROMOTE': '/import-manager/promote-appeals',
        'IMPORT_REJECT': '/import-manager/disassociations',
        "IMPORT_DELETE": '/import-manager?',
        "GET_PROMOTE": '/import-manager/',
        'IMPORT_GET_APPEALS': '/appeals/appealNumbers?caseNumber=',
        'IMPORT_ENTER_APPEAL': '/appeals/appealNumbers?appealNumber=',
        'PRIVILEGES': '/user-management/user-available-privileges?loginId=',
        'CASETYPE': '/fetch-case-type',
        'CREATEASSIGNMENT': '/assignments/',
        'UPDATE_ASSIGNMENT': '/assignments/',
        'ASSIGNMENTBYID': '/assignments/',
        'CREDITSBYID': '/credits-adjustment-request?ptabAssignmentId=',
        'CASENO': '/assignments/meta-data?',
        'ASSIGNMENTHISTORY': '/assignments-history/',
        'REDIRECT_TO_TRIALS': '/redirect-to-trials/',
        'STND_ASSIGNMENT_TYPE': '/reference-data/assignment-types',
        'TEAMMATES': '/user-management/team-members/',
        'STND_ASSIGNMENT_STATUS': '/reference-data/assignment-status',
        'ASSIGNMENTS_ADV_SEARCH': '/assignment-views?widgetId=',
        'ASSIGNMENTS_CASE_TYPES': '/reference-data/case-types',
        'ASSIGNMENT_DOCKET_ADV_SEARCH': '/mixed-case-dockets?widgetId=',
        'APPEAL_METADATA': '/appeals/metadata/',
        'PREVIEW': '/preview-file',
        'UPLOAD': '/upload-docket-notice',
        'UPLOADPTAB_NOTICE': '/upload-ptab-notice',
        'USERPREVIEW': '/preview-user-multiple-generated?',
        'CUSTOM_DATES': '/user-defined-date',
        'SNOH': '/hearing-room-rosters/send-notice-of-hearing?',
        'ENOH': '/hearing-room-rosters?',
        'SUBMITENOH': '/hearing-room-rosters',
        'MAILDECISIONUPLOAD': '/appeal-decision',
        'UPLOADPROCESS': '/appeals-docket/upload-process-dismissal',
        'UPLOADADMINREMAND': '/appeals-docket/upload-process-admin-remand',
        'PROCESSREMAND': '/ptab-notice/upload-ptab-notice/panel-info',
        'APPEAL_DOCKET': '/appeals-docket',
        'PTAB_NOTICE': '/ptab-notice',
        'UPLOAD_EMAIL': '/email-ptab-notice?',
        'SYSGEN': '/preview-system-generated?',
        'USERGEN': '/preview-user-generated?',
        'DOWNLOAD_RTF': '/download-rtf?',
        'HOLIDAYCHECKS': '/reference-data/holiday-checks?',
        'DISMISSAL': '/reference-data/code-reference-types?typeCode=DISMISSAL',
        'CUSTOMDATES': '/reference-data/code-reference-types?typeCode=CUSTOM_DATES',
        'STATUSNOH': '/reference-data/code-reference-types?typeCode=NOH_STATUS_TYPE',
        'SPECIALSTATUSNOH': '/reference-data/code-reference-types?typeCode=SPECIAL_TYPE',
        'STATUSSRD': '/reference-data/code-reference-types?typeCode=SND_STATUS_TYPE',
        'UPDATESTATUSUHA': '/reference-data/code-reference-types?typeCode=UHA_STATUS_TYPE',
        'PROCESSVTHHEARINGTYPE': '/reference-data/code-reference-types?typeCode=HEARING',
        'REMAND': '/reference-data/code-reference-types?typeCode=REMAND',
        'EDITREMAND': '/reference-data/code-reference-types?typeCode=EDITREMAND',
        'EDITDISMISSAL': '/reference-data/code-reference-types?typeCode=EDITDISMISSAL',
        'REVIEWCHECKLIST': '/reference-data/code-reference-types?typeCode=ASSIGNMENT-REVIEW-CHECKLIST',
        'ASSIGNMENTMODIFIEDTYPES': '/reference-data/assignment-types?',
        'ACTIONS': '/reference-data/code-reference-types?typeCode=DECISION_DOCUMENT_ACTION',
        'CREATEDECISION': '/reference-data/code-reference-types?typeCode=CREATE_DECISION_DRAFT',
        'CREATEREHEARING': '/reference-data/code-reference-types?typeCode=CREATE_REHEARING_DECISION',
        'SUBCREATEDECISION': '/reference-data/code-reference-types?typeCode=SUB_CREATE_DECISION_DRAFT',
        'REVIEWREHEARING': '/reference-data/code-reference-types?typeCode=REVIEW_REHEARING_DRAFT',
        'REVIEWDECISION': '/reference-data/code-reference-types?typeCode=REVIEW_DECISION_DRAFT',
        'REVIEWSUBDECISION': '/reference-data/code-reference-types?typeCode=REVIEW_SUBSEQUENT_DECISION',
        'DECISIONTYPE': '/reference-data/decision-types',
        'REHEARING_DECISION_TYPE': '/reference-data/decision-type-rehearing',
        'RULETYPE': '/reference-data/decision-type/',
        'RHTSTATUS': '/reference-data/code-reference-types?typeCode=RHT_STATUS_TYPE',
        'APPEAL_DECISION': '/appeal-decision',
        'REHEARING_DECISION': '/decision-history',
        'APJPANEL': '/reference-data/code-reference-types?typeCode=APJ_PANEL',
        'APJ1': '/reference-data/code-reference-types?typeCode=APJ',
        'GET_POST_DECISIONS': '/appeal-decision',
        'CASE_SEARCH': '/case-information/caseNumber-search?caseNumber=',
        //Announcements URL's
        'GET_ANNOUNCEMENT_BY_ID': '/announcements?announcementIdentifier=',
        'GET_ANNOUNCEMENTS': '/announcements',
        'ANNOUNCEMENT_SEARCH': '/announcements/search-code',
        'ANNOUNCEMENT_TYPES': '/reference-data/announcement-types',
        'ANNOUNCEMENT_USER_ROLE': '/reference-data/user-roles',
        'ARCHIVE_ANNOUNCEMENT': '/announcements/',
        'DELETE_ANNOUNCEMENT': '/announcements/',
        'UPDATE_ANNOUNCEMENT': '/announcements/',
        'PUBLISH_ANNOUNCEMENT': '/announcements',
        'PARTIES': '/bib-data/parties/',
        'JUDGERANKS': '/user-management/users',
        'ADMINTABS': '/reference-data/code-reference-types?typeCode=ANNOUNCEMNT_ADMIN',
        //Paneling
        'GET_DISCIPLINES': '/user-management/user-disciplines',
        'GET_SECTIONS': '/user-management/sections',
        'GET_JUDGES': '/user-management/users?',
        'GET_ALL_JUDGES': '/user-management/users',
        'CREATE_JUDGE_PANEL': '/appeal-judge-panels',
        'GET_SELECTED_JUDGES': '/appeal-judge-panels?appealNumber=',
        'GET_PANEL_HISTORY': '/appeal-judge-panels/panel-history?appealNumber=',
        'GET_ATTORNEY_LIST': '/user-management/attorneys/',
        'VALIDATETEAMLEAD': '/user-management/validate-team-lead?',
        'WEEKLYSCHEDULES': '/hearing-room-rosters/weekly-schedules',
        'UPDATE_OR_CLEAR_PANEL': '/assignments/panel-assignment',
        'UPDATE_PANEL': '/assignments',
        'COMMENT_LIST': '/reference-data/code-reference-types?typeCode=COMMENT TYPE',
        'GET_CIRCULATION_DETAILS': '/circulation/getAllDetails?appealNumber=',
        'GET_PGA_DETAILS': '/prodn-goal-adjust/get-PGA?ptabAssignmentId=',
        'ACCEPT_PGA': '/prodn-goal-adjust/update-PGA',
        'UPDATE_DUE_DATE': '/assignments/update-due-date'
      },
      'ANNOUNCEMENTS': {
        'STATUS_PUBLISHED': 'Published',
        'STATUS_DRAFT': 'Draft',
        'STATUS_ARCHIVED': 'Archived'
      },
      'ALERTS': {
        'NEW': {
          label: 'New',
          value: 'New assignment'
        },
        'CRITICAL': {
          label: 'Critical',
          value: 'Critical indicator'
        },
        'DUE_TODAY': {
          label: 'Due today',
          value: 'Assignment is due today'
        },
        'PAST_DUE': {
          label: 'Past due',
          value: 'Assignment is past due'
        },
        'NO_ALERTS': {
          label: 'No alerts',
          value: 'END'
        },
        'USER_INACTIVE': {
          label: 'Inactive user',
          value: "User is inactive"
        },
        'UPCOMING': {
          label: 'Upcoming',
          value: 'Upcoming'
        }
      },
      'TYPE_CODES': {
        'HEARD': 'Heard'
      },
      'MESSAGES': {
        'SAVE_GRID_DISABLED': 'Click here to save grid preferences',
        'SAVE_GRID_PREFERENCES': 'You have unsaved preferences on grid. Click here to save grid preferences',
        'GRID_REFRESH': 'Click to refresh'
      },
      'PAGINATION': {
        'TEN': 10,
        'TWENTY_FIVE': 25,
        'FIFTY': 50,
        'ONE_HUNDRED': 100
      },
      'LAYOUTS': [{
          image: 'assets/images/Zone-Layout-1.jpg',
          name: 'Full view',
          structure: '12'
        },
        {
          image: 'assets/images/Zone-Layout-2.jpg',
          name: 'Two column',
          structure: '6-6'
        },
        {
          image: 'assets/images/Zone-Layout-3.jpg',
          name: 'Three column',
          structure: '4-4-4'
        },
        {
          image: 'assets/images/Zone-Layout-4.jpg',
          name: 'Left column',
          structure: '8-4'
        },
        {
          image: 'assets/images/Zone-Layout-5.jpg',
          name: 'Right column',
          structure: '4-8'
        },
        {
          image: 'assets/images/Zone-Layout-6.jpg',
          name: 'Four column',
          structure: '12-4-8-12'
        },
        {
          image: 'assets/images/Zone-Layout-7.jpg',
          name: 'Five column',
          structure: '12-4-4-4-12'
        }
      ],
      'REFRESH_INTERVAL': {
        'CURRENT': 60000,
        'PLANNED': 3600000
      },
      'ONEZEROONERULING': {
        tooltip: 'In order to receive proper crediting for appeals containing a 101 rejection, please ensure the "101 ruling" box is checked.',
        addedText: 'Before checking the box and submitting for mailing, please ensure that the panel has received any required clearances from management.'
      },
      'SPECIAL_TYPE_REQUEST': {
        tooltip: 'In order to receive proper crediting for appeals containing a 101 rejection, please indicate in the reason box where the "101 ruling" should be applied'
      },
      'STND_GRID_OPTIONS': {
        enableGridMenu: true,
        enableSelectAll: true,
        useExternalFiltering: false,
        enableFiltering: true,
        exporterMenuExcel: false,
        exporterMenuPdf: false,
        paginationPageSizes: [10, 25, 50, 100]
      },
      'GLOBAL': {
        'RADIX': 10
      }
    });
})();
