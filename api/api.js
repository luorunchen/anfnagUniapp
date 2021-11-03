import {
	service
} from '../utils/request.js'

export function check_device_type(user_name, my_username) {
	return service({
		url: `/check_device_type.action`,
		method: 'GET',
		params: {
			user_name,
			my_username
		}
	})
}

//用户信息
export function checkuser(user_name, my_username) {
	return service({
		url: `/checkuser.action`,
		method: 'GET',
		params: {
			user_name,
			my_username
		}
	})
}
//登录
export function APPlogin(user_name, password) {
	return service({
		url: `/APPlogin.action`,
		method: 'POST',
		params: {
			user_name,
			password,

		}
	})
}

//项目管理
export function AppProjectList(username, region, pageNo, object, pageSize, state, my_username) {
	return service({
		url: `/AppProjectList.action`,
		method: 'GET',
		params: {
			username,
			region,
			pageNo,
			object,
			pageSize,
			state,
			my_username

		}
	})
}
//项目设备详情
export function getDeviceByPid(username, pid, my_username) {
	return service({
		url: `/admin/device/getDeviceByPid.action`,
		method: 'GET',
		params: {
			username,
			pid,
			my_username

		}
	})
}
//项目详情
export function AppProject(pid, my_username) {
	return service({
		url: `/AppProject.action`,
		method: 'GET',
		params: {

			pid,
			my_username

		}
	})
}
//历史报警信息
export function getHistAlarm(devId, deviceid, my_username) {
	return service({
		url: `/admin/device/getHistAlarm.action`,
		method: 'GET',
		params: {
			devId,
			deviceid,
			my_username

		}
	})
}
//历史报警信息
export function getDeviceByDevId(devid, my_username) {
	return service({
		url: `/admin/device/getDeviceByDevId.action`,
		method: 'GET',
		params: {
			devid,

			my_username

		}
	})
}
//获取区域编码
export function regionList(code) {
	return service({
		url: `/region/regionList.action`,
		method: 'GET',
		params: {
			code
		}
	})
}

//获取责任人，防火员
export function getLegalFireMan(state, object) {
	return service({
		url: `/getLegalFireMan.action`,
		method: 'GET',
		params: {
			state,
			object
		}
	})
}

//添加项目
export function addProject(username, projName, projLocation, fireGuardId, legalPersonId, projRemark, long_lat,
	placetype, code, gridmanId, street_charge) {
	return service({
		url: `/admin/project/check/addProject.action`,
		method: 'GET',
		params: {
			username,
			projName,
			projLocation,
			fireGuardId,
			legalPersonId,
			projRemark,
			long_lat,
			placetype,
			code,
			gridmanId,
			street_charge
		}
	})
}
//添加项目
export function deleProject(username, pid) {
	return service({
		url: `/admin/project/check/deleProject.action`,
		method: 'GET',
		params: {
			username,
			pid
		}
	})
}

//分享项目
export function addRegisterProject(username, pid, my_username) {
	return service({
		url: `/admin/project/addRegisterProject.action`,
		method: 'GET',
		params: {
			username,
			pid,
			my_username
		}
	})
}
//删除设备
export function deleDevice(devId, username, my_username) {
	return service({
		url: `/admin/device/check/deleDevice.action`,
		method: 'GET',
		params: {
			devId,
			username,
			my_username
		}
	})
}
//新增设备
export function addDevice(projName, devSignature, username, installLocation, long_lat, devtype, device_name, place,
	superiorEquipme, loopNumber, devId, devRemark, sms, phone) {
	return service({
		url: `/admin/device/check/addDevice.action`,
		method: 'GET',
		params: {
			projName,
			devSignature,
			username,
			installLocation,
			long_lat,
			devtype,
			device_name,
			place,
			superiorEquipme,
			loopNumber,
			devId,
			devRemark,
			sms,
			phone
		}
	})
}
//新增设备
export function AppDeviceList(username, my_username, pageNo, pageSize, object) {
	return service({
		url: `/AppDeviceList.action`,
		method: 'GET',
		params: {
			username,
			my_username,
			pageNo,
			pageSize,
			object
		}
	})
}
//报警信息
export function check_alldevice(username, my_username) {
	return service({
		url: `/check_alldevice.action.action`,
		method: 'GET',
		params: {
			username,
			my_username,

		}
	})
}
//电气设备
export function check_devicereportid(id, status, my_username) {
	return service({
		url: `/check_devicereportid.action`,
		method: 'GET',
		params: {
			id,
			status,
			my_username,

		}
	})
}

//实时值
export function ReadParameterApi(id, my_username) {
	return service({
		url: `/ReadParameterApi.action`,
		method: 'GET',
		params: {
			id,
			my_username,
		}
	})
}

//阀值设置
export function SetParameterApi(devSignature, parNine, parTen, parEleven,
	parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen) {
	return service({
		url: `/SetParameterApi.action`,
		method: 'GET',
		params: {
			devSignature,
			parNine,
			parTen,
			parEleven,
			parTwelve,
			parThirteen,
			parFourteen,
			parFifteen,
			parSixteen,
			parSeventeen,
			parEighteen,
			parNineteen
		}
	})
}


//新增人员
export function addLegalFireMan(state, fname, username, fphone, tel, long_lat, long_latbai, ftelephone) {
	return service({
		url: `/admin/project/check/addLegalFireMan.action`,
		method: 'GET',
		params: {
			state,
			fname,
			username,
			fphone,
			tel,
			long_lat,
			long_latbai,
			ftelephone
		}
	})
}
//所有设备
export function newcheck_devicetp(username, type, Number, pageNum, my_username, object) {
	return service({
		url: `/RegionDevice/newcheck_devicetp.action`,
		method: 'GET',
		params: {
			username,
			type,
			Number,
			pageNum,
			my_username,
			object
		}
	})
}
//所有设备
export function putMessToDevice(username, imei, content) {
	return service({
		url: `/admin/project/putMessToDevice.action`,
		method: 'GET',
		params: {
			username,
			imei,
			content
		}
	})
}

//修改密码
export function passwordSSS(passwordencrypt, password, user_name, my_username) {
	return service({
		url: `/updateuserpassword.action`,
		method: 'GET',
		params: {
			passwordencrypt,
			password,
			user_name,
			my_username
		}
	})
}
//接入设备->报警=>解除报警接口
export function WebeditFileimageServlet(username, cause) {
  return service({
    url: `/WebeditFileimageServlet`,
    method: 'GET',
    params: {
      username,
      cause,

    }
  })
}
export function closeVoice(username,imei,style,time) {
  return service({
    url: `/WebProject/closeVoice.action`,
    method: 'GET',
    params: {
      username,imei,style,time
    }
  })
}
export function setDepoly(username,deploy,imei) {
  return service({
    url: `/WebProject/setDepoly.action`,
    method: 'GET',
    params: {
      username,deploy,imei
    }
  })
}