import $http from '../common/http';
// import ding from "../common/ding";
const baseUrl = 'http://192.168.1.234:9101/' // 綫下地址
// var baseUrlDev = 'https://pazht.ouhai.gov.cn:8000/' // 綫上地址
export function _http(url, data, method) {
  return $http[method || 'get'](`${baseUrl}${url}`, data)
}

export const dictDropDown = (data) => $http.get(`${baseUrl}emergency/dataDict/getDataDictItemDropDown`,data)
// 零报送
export function queryMyReportPage(data) {
  return $http.get(`${baseUrl}emergency/zeroReport/queryMyReportPage`, data)
}

// 获取零报告基本信息、报送信息
export function getReportDetailInfo(data) {
  return $http.get(`${baseUrl}emergency/zeroReport/getReportDetailInfo`, data)
}

// 获取零报告基本信息、报送信息
export function doReport(data) {
  return $http.post(`${baseUrl}emergency/zeroReport/doReport`, data)
}

export function endTask(data) {
  return $http.post(`${baseUrl}conversionCrime/controlTask/endTask`, data)
}

// 平安督办
export function getPageListOfMonitor(data) {
  return $http.get(`${baseUrl}socialGovernance/monitorMission/getPageListOfMonitor`, data)
}

export function dealCallBack(data) {
  return $http.post(`${baseUrl}socialGovernance/monitorMission/dealCallBack`, data)
}

export function dealOpreate(data) {
  return $http.post(`${baseUrl}emergency/securityEvent/applyCompletion`, data)
}

export function getMonitorDetail(data) {
  return $http.get(`${baseUrl}socialGovernance/monitorMission/getMonitorDetail`, data)
}

// 人员管控--------------
// 详情
export function getPeoplePetitionInfoByDing(data) {
  return $http.get(`${baseUrl}socialGovernance/OuEmphasesPeople/getPeoplePetitionInfoByDing`, data)
}

// 签到权限
export function getSignOpdata(data) {
  return $http.get(`${baseUrl}socialGovernance/OuEmphasesPeople/getSignOpdata`, data)
}

// 异动信息列表
export function getPeoplePetitionListByDing(data) {
  return $http.get(`${baseUrl}socialGovernance/OuEmphasesPeople/getPeoplePetitionListByDing`, data)
}

// 获取处置流程
export function getPetitionRecordListById(data) {
  return $http.get(`${baseUrl}socialGovernance/OuEmphasesPeople/getPetitionRecordListById`, data)
}

// 处置小组列表
export function getDealTeamListByScreen(data) {
  return $http.get(`${baseUrl}socialGovernance/dealTeam/getDealTeamListByScreen`, data)
}

export function confirmRead(data) {
  return $http.post(`${baseUrl}socialGovernance/OuEmphasesPeople/confirmRead`, data)
}

export function signRecord(data) {
  return $http.post(`${baseUrl}socialGovernance/OuEmphasesPeople/signRecord`, data)
}

// 通知 人员管控 详情
export function getPeoplePetitionInfo(data) {
  return $http.get(`${baseUrl}socialGovernance/OuEmphasesPeople/getPeoplePetitionInfo`, data)
}

export function addPeoplePetitionRecord(data) {
  return $http.post(`${baseUrl}socialGovernance/OuEmphasesPeople/addPeoplePetitionRecord`, data)
}


export function updateJspticket(data) {
  return $http.post(`${baseUrl}socialGovernance/dingGover/updateJspticket`, data)
}

export function fyApiGatewayUserInfo(data) {
  return $http.get(`${baseUrl}socialGovernance/dingGover/getUserInfo`, data)
}

export function fyApiGatewayConfig(data) {
  return $http.get(`${baseUrl}socialGovernance/dingGover/getConfig`, data)
}

export function getRoadList(data) {
  return $http.get(`${baseUrl}socialGovernance/roadConfig/getRoadList`, data)
}

export function SignIn(data) {
  return $http.post(`${baseUrl}socialGovernance/YQemergencyProcess/SignIn`, data)
}

export function getListByCondition(data) {
  return $http.get(`${baseUrl}socialGovernance/emergencyPlans/getListByCondition`, data)
}

export function emergencyOperate(data) {
  return $http.post(`${baseUrl}socialGovernance/YQemergencyProcess/emergencyOperate`, data)
}

export function getEmergencyEventDetail(data) {
  return $http.get(`${baseUrl}socialGovernance/YQemergencyProcess/getEmergencyEventDetail`, data)
}

export function getTypeList_1(data) {
  return $http.get(`${baseUrl}socialGovernance/statistics/getTypeList`, data)
}

export function getTypeList_7(data) {
  return $http.get(`${baseUrl}socialGovernance/statistics/getTypeList`, data)
}

export function getTypeList_8(data) {
  return $http.get(`${baseUrl}socialGovernance/statistics/getTypeList`, data)
}


// 135应急
export function getSceneFeedBackList(data) {
  return $http.get(`${baseUrl}socialGovernance/YQemergencyProcess/getSceneFeedBackList`, data)
}

export function changeSignStatus(data) {
  return $http.post(`${baseUrl}socialGovernance/YQemergencyProcess/changeSignStatus`, data)
}

export function getDetailById(data) {
  return $http.get(`${baseUrl}socialGovernance/emergencyProcess/getDetailById`, data)
}

export function addEmergencyEvent(data) {
  return $http.post(`${baseUrl}socialGovernance/YQemergencyProcess/addEmergencyEvent`, data)
}

export function getEmergencyEventList(data) {
  return $http.get(`${baseUrl}emergency/zeroReport/queryMyReportPage`, data)
}

export function getTypeList19(data) {
  return $http.get(`${baseUrl}dataView/ouHai/getTypeList?type=19`, data)
}

export function getSelfCheckRectifyCount(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getSelfCheckRectifyCount`, data)
}

export function getLoginInfoByRbacToken(data) {
  return $http.get(`${baseUrl}rbac/login/getLoginInfoByRbacToken`, data)
}

//平安检查
// 保存提交
export function saveSafetyRectifySituation(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/saveSafetyRectifySituation`, data)
}

// 获取回显列表
export function getSafetyRectifyProblemList(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getSafetyRectifyProblemList`, data)
}

export function getSafetyRectifySituationList(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getSafetyRectifySituationList`, data)
}

// 平安自查
// 保存上报
export function saveSafetySelfCheck(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/saveSafetySelfCheck`, data)
}

// 获取列表
export function getSafetySelfCheckPageList(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getSafetySelfCheckPageList`, data)
}

// 获取详情中事件
export function getHandleEventDetailById(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getHandleEventDetailById`, data)
}

// 获取附件
export function selSelfCheckFileList(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/selSelfCheckFileList`, data)
}

// 意见反馈
export function getDetailList(data) {
  return $http.get(`${baseUrl}dataView/suggestionFeedback/getPageList`, data)
}

export function getTypeList17(data) {
  return $http.get(`${baseUrl}dataView/ouHai/getTypeList`, data)
}

export function addFeedback(data) {
  return $http.post(`${baseUrl}dataView/suggestionFeedback/addFeedback`, data)
}

// 一日三见面
export function getPageList(data) {
  return $http.get(`${baseUrl}dataView/emphPeopleTrack/getPageList`, data)
}

export function getEmphPeopleList(data) {
  return $http.get(`${baseUrl}dataView/emphPeopleTrack/getEmphPeopleList`, data)
}

export function addTrack(data) {
  return $http.post(`${baseUrl}dataView/emphPeopleTrack/addTrack`, data)
}

//

export function getConfig(data) {
  // return $http.get(`${baseUrl}dataView/diingtalk/getConfig?url=${ding.mobBackUrl}&dingId=${ding.dingId}`)
  return $http.get(`${baseUrl}dataView/dingGover/getConfig`, data)
}

export function getUserInfo(data) {
  // return $http.get(`${baseUrl}dataView/diingtalk/getUserInfo`, data)
  return $http.get(`${baseUrl}dataView/dingGover/getUserInfo`, data)
}

export function getSomeList(data) {
  return $http.get(`${baseUrl}dataView/ouHai/getTypeList?`, data)
}

export function upload(data) {
  return $http.post(`${baseUrl}rbac/file/upload`, data)
}

export function uploadRb(data) {
  return $http.post(`${baseUrl}rbac/file/uploadRb`, data)
}

//
export function addHandle(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/addHandle`, data)
}

export function selAllDepAndUserByRight2(data) {
  return $http.get(`${baseUrl}rbac/fyDepartment/selAllDepAndUserByRight`, data)
}

export function selAllDepAndUserByRight(data) {
  // return $http.get(`${baseUrl}rbac/fyDepartment/selAllDepAndUserByRight`, data)
  return $http.get(`${baseUrl}rbac/fyDepartment/selDepAndUserByWorkGroupAndRight`, data)
}

export function getHandleProgList(data) {
  return $http.get(`${baseUrl}dataView/handle/getHandleProgList`, data)
}

export function selHandleFileList(data) {
  return $http.get(`${baseUrl}dataView/handle/selHandleFileList`, data)
}

export function getLeaderHandleList(data) {
  return $http.get(`${baseUrl}dataView/handle/getLeaderHandleList`, data)
}

export function delHandle(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/delHandle`, data)
}

export function addHandleData(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/handle/addHandleData`, data)
}

export function addHandle1(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/handle/addHandle`, data)
}

export function addHandleNew(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/handle/addHandleNew`, data)
}

export function getSupplementHandleList(data) {
  return $http.get(`${baseUrl}dataView/handle/getSupplementHandleList`, data)
}

export function getHandleRole(data) {
  return $http.get(`${baseUrl}dataView/handle/getHandleRole`, data)
}

export function saveHandle(data) {
  return $http.post(`${baseUrl}dataView/handle/saveHandle`, data)
}

// ---------------维稳上报 列表接口
export function getEventList(data) {
  return $http.get(`${baseUrl}dataView/exEvent/getEventList`, data)
}

export function getEventByIdByRbacToken(data) {
  return $http.get(`${baseUrl}dataView/exEvent/getEventByIdByRbacToken`, data)
}

export function addEvent(data) { // 维稳上报  上报
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/exEvent/addEvent.do`, data)
}

export function updateEvent(data) {
  return $http.post(`${baseUrl}dataView/exEvent/updateEvent.do`, data)
}

export function updateEventNew(data) { // 维稳上报  删除  编辑
  return $http.post(`${baseUrl}dataView/exEvent/updateEventNew`, data)
}

export function checkUrlRight(data) { // 维稳上报 重点信访异动信息权限控制
  return $http.get(`${baseUrl}rbac/fyOpdataRight/checkUrlRight`, data)
}

export function getReportSourceNameList(data) { // 维稳上报 权限控制
  return $http.get(`${baseUrl}rbac/fyOpdataRight/getReportSourceNameList`, data)
}

// --------------紧急
export function addEvent2(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/exEvent/addEvent`, data)
}

// --------------平安
export function addSafetyEvent(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/handleEvent/addSafetyEvent`, data)
}

export function getSafetyList(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getSafetyList`, data)
}

export function safetyUpdate(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/updateEvent`, data)
}

// --------zero
export function getList(data) {
  return $http.get(`${baseUrl}dataView/daySituation/getList`, data)
}

export function getAlertSettingToday(data) {
  return $http.get(`${baseUrl}dataView/daySituation/getAlertSettingToday`, data)
}

export function getReportedForUser(data) {
  return $http.get(`${baseUrl}dataView/daySituation/getReportedForUser`, data)
}

export function addDaySituation(data) {
  data.DingOrGover = 2
  return $http.post(`${baseUrl}dataView/daySituation/addDaySituation`, data)
}


export function getTeamWorkRightForAPP(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getTeamWorkRightForAPP`, data)
}

export function getEventListByTodoForAPP(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getEventListByTodoForAPP`, data)
}

export function getHandleEventDetailByIdForApp(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getHandleEventDetailByIdForApp`, data)
}

//-------------health
export function saveData(data) {
  return $http.post(`${baseUrl}dataView/handleEvent/svaeData`, data)
}

export function getHealthEventDetailById(data) {
  return $http.get(`${baseUrl}dataView/handleEvent/getHealthEventDetailById`, data)
}

export function getRestOfMenu(data) {
  return $http.get(`${baseUrl}rbac/fyOpdataRight/getRestOfMenu`, data)
}


// 设备任务列表
export function getEquipmentMission(data) {
  return $http.get(`${baseUrl}socialGovernance/equipment/getEquipmentMission`, data)
}

// 设备任务详情
export function getEquipmentMissionDetail(data) {
  return $http.get(`${baseUrl}socialGovernance/equipment/getEquipmentMissionDetail`, data)
}

// 设备执行
export function saveEquipmentMissionDetail(data) {
  return $http.post(`${baseUrl}socialGovernance/equipment/anwser`, data)
}

// 民转刑钉钉端
// 线索事件列表
export function getCluesList(data) {
  return $http.get(`${baseUrl}conversionCrime/cluePool/findPageListForZZD`, data)
}

// 线索事件详情
export function getCluesDetail(data) {
  return $http.get(`${baseUrl}conversionCrime/cluePool/clueDetail`, data)
}

// 新增线索事件
export function addClues(data) {
  return $http.post(`${baseUrl}conversionCrime/cluePool/saveOrEdit`, data)
}

// 人物检索
export function peopleSearch(data) {
  return $http.get(`${baseUrl}conversionCrime/cluePool/peopleSearch`, data)
}

// 关联人员
export function associatePeople(data) {
  return $http.post(`${baseUrl}conversionCrime/cluePool/associatePeople`, data)
}

// 新增人员
export function addPeople(data) {
  return $http.post(`${baseUrl}conversionCrime/people/saveOrEdit`, data)
}


// 管控任务列表
export function getControlTaskList(data) {
  return $http.get(`${baseUrl}conversionCrime/controlTask/findControlTaskPageList`, data)
}

// 获取管控任务详情
export function getControlDetail(data) {
  return $http.get(`${baseUrl}conversionCrime/controlTask/getControlDetail`, data)
}

// 获取反馈列表
export function getTaskHandle(data) {
  return $http.get(`${baseUrl}conversionCrime/controlTask/getTaskHandle`, data)
}

// 获取管控人员信息
export function getControlPeopleDetail(data) {
  return $http.get(`${baseUrl}conversionCrime/people/detail`, data)
}

// 新增管控反馈
export function saveFeedBack(data) {
  return $http.post(`${baseUrl}conversionCrime/controlTask/saveFeedBack`, data)
}

// 获取审核信息
export function getTaskVerify(data) {
  return $http.get(`${baseUrl}conversionCrime/controlTask/getTaskVerify`, data)
}

// 判断是否为重点人
export function isKeyPerson(data) {
  return $http.get(`${baseUrl}conversionCrime/people/isKeyPersonnel`, data)
}

// 获取街道
export function getTypeList_13(data) {
  return $http.get(`${baseUrl}socialGovernance/statistics/getTypeList`, data)
}

// 获取行为、事件
export function getClueEventTypeSetting(data) {
  return $http.get(`${baseUrl}conversionCrime/earlyWarning/getClueEventTypeSetting`, data)
}

// 获取性格标签
export function getCharacterLabelSetting(data) {
  return $http.get(`${baseUrl}conversionCrime/earlyWarning/getCharacterLabelSetting`, data)
}

// 获取村社信息
export function getCommunityListByRoadId(data) {
  return $http.get(`${baseUrl}conversionCrime/fyDistricts/getCommunityListByRoadId`, data)
}

// 暗访 首页
// 点位事件分页列表
function getPointEventList(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/pointLocationEvent/getPointEventList`, data)
}

// 获取用户组别信息
function getUserGroupInfo(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/pointLocationEvent/getUserGroupInfo`, data)
}

// 获取隐患申诉/延期流程列表分页
function queryFlowHiddenTroublePageForAppealOrExtension(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/troubleHandle/queryFlowHiddenTroublePageForAppealOrExtension`, data)
}

// 查询查询历史
function getPointEventSearchHistory(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/pointLocationEvent/getPointEventSearchHistory`, data)
}

// 删除某个查询历史记录 isAll则是全部
function deleteEventSearchHistory(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/pointLocationEvent/deleteEventSearchHistory`, data)
}

// 获取点位事件详情 根据事件id和事件状态
function getPointEventDetail(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/pointLocationEvent/getPointEventDetail`, data)
}

// 点位事件统计
function getHiddenTroubleStatistic(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/troubleHandle/getHiddenTroubleStatistic`, data)
}

// 获取隐患详情
function getHiddenTroubleDetail(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/troubleHandle/getHiddenTroubleDetail`, data)
}

// 获取隐患处置信息
function getHiddenTroubleHandleDetail(data) {
  return $http.get(`${baseUrl}fySecretInvestigate/troubleHandle/getHiddenTroubleHandleDetail`, data)
}

// 上传隐患整改结果 -- 图片和描述
function uploadHandleResult(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/troubleHandle/uploadHandleResult`, data)
}

// 延期申请审核
function delayApproveHiddenTrouble(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/hiddenTroubleApprove/delayApproveHiddenTrouble`, data)
}

// 隐患申述上传
function appealApproveHiddenTrouble(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/hiddenTroubleApprove/appealApproveHiddenTrouble`, data)
}

// 隐患抽查驳回
function spotCheckHiddenTrouble(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/hiddenTroubleApprove/spotCheckHiddenTrouble`, data)
}

// 复查
function recheckApproveHiddenTrouble(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/hiddenTroubleApprove/recheckApproveHiddenTrouble`, data)
}

// 初查审核
function checkApproveHiddenTrouble(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/hiddenTroubleApprove/checkApproveHiddenTrouble`, data)
}

// 新增点位事件
function addPointLocationEvent(data) {
  return $http.post(`${baseUrl}fySecretInvestigate/pointLocationEvent/addPointLocationEvent`, data)
}

export default {
  getPointEventList,
  getUserGroupInfo,
  getPointEventDetail,
  getHiddenTroubleDetail,
  getHiddenTroubleHandleDetail,
  uploadHandleResult,
  delayApproveHiddenTrouble,
  getHiddenTroubleStatistic,
  spotCheckHiddenTrouble,
  recheckApproveHiddenTrouble,
  checkApproveHiddenTrouble,
  appealApproveHiddenTrouble,
  queryFlowHiddenTroublePageForAppealOrExtension,
  getPointEventSearchHistory,
  deleteEventSearchHistory,
  addPointLocationEvent
}
