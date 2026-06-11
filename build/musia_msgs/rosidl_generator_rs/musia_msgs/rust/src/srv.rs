#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};




// Corresponds to musia_msgs__srv__SetTourMode_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetTourMode_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub target_state: u8,

}



impl Default for SetTourMode_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::SetTourMode_Request::default())
  }
}

impl rosidl_runtime_rs::Message for SetTourMode_Request {
  type RmwMsg = super::srv::rmw::SetTourMode_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        target_state: msg.target_state,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      target_state: msg.target_state,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      target_state: msg.target_state,
    }
  }
}


// Corresponds to musia_msgs__srv__SetTourMode_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetTourMode_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub message: std::string::String,

}



impl Default for SetTourMode_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::SetTourMode_Response::default())
  }
}

impl rosidl_runtime_rs::Message for SetTourMode_Response {
  type RmwMsg = super::srv::rmw::SetTourMode_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        success: msg.success,
        message: msg.message.as_str().into(),
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      success: msg.success,
        message: msg.message.as_str().into(),
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      success: msg.success,
      message: msg.message.to_string(),
    }
  }
}


// Corresponds to musia_msgs__srv__GetCurrentZone_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct GetCurrentZone_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub structure_needs_at_least_one_member: u8,

}



impl Default for GetCurrentZone_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::GetCurrentZone_Request::default())
  }
}

impl rosidl_runtime_rs::Message for GetCurrentZone_Request {
  type RmwMsg = super::srv::rmw::GetCurrentZone_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
    }
  }
}


// Corresponds to musia_msgs__srv__GetCurrentZone_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct GetCurrentZone_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub zone_name: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_waypoint: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,

}



impl Default for GetCurrentZone_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::GetCurrentZone_Response::default())
  }
}

impl rosidl_runtime_rs::Message for GetCurrentZone_Response {
  type RmwMsg = super::srv::rmw::GetCurrentZone_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        zone_name: msg.zone_name.as_str().into(),
        current_waypoint: msg.current_waypoint,
        success: msg.success,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        zone_name: msg.zone_name.as_str().into(),
      current_waypoint: msg.current_waypoint,
      success: msg.success,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      zone_name: msg.zone_name.to_string(),
      current_waypoint: msg.current_waypoint,
      success: msg.success,
    }
  }
}


// Corresponds to musia_msgs__srv__NavigateToPOI_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct NavigateToPOI_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub waypoint_id: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub cancel: bool,

}



impl Default for NavigateToPOI_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::NavigateToPOI_Request::default())
  }
}

impl rosidl_runtime_rs::Message for NavigateToPOI_Request {
  type RmwMsg = super::srv::rmw::NavigateToPOI_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        waypoint_id: msg.waypoint_id,
        cancel: msg.cancel,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      waypoint_id: msg.waypoint_id,
      cancel: msg.cancel,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      waypoint_id: msg.waypoint_id,
      cancel: msg.cancel,
    }
  }
}


// Corresponds to musia_msgs__srv__NavigateToPOI_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct NavigateToPOI_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub message: std::string::String,

}



impl Default for NavigateToPOI_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::NavigateToPOI_Response::default())
  }
}

impl rosidl_runtime_rs::Message for NavigateToPOI_Response {
  type RmwMsg = super::srv::rmw::NavigateToPOI_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        success: msg.success,
        message: msg.message.as_str().into(),
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      success: msg.success,
        message: msg.message.as_str().into(),
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      success: msg.success,
      message: msg.message.to_string(),
    }
  }
}


// Corresponds to musia_msgs__srv__PlayAudio_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct PlayAudio_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub mode: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub payload: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub language: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub volume: f32,

}



impl Default for PlayAudio_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::PlayAudio_Request::default())
  }
}

impl rosidl_runtime_rs::Message for PlayAudio_Request {
  type RmwMsg = super::srv::rmw::PlayAudio_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        mode: msg.mode,
        payload: msg.payload.as_str().into(),
        language: msg.language.as_str().into(),
        volume: msg.volume,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      mode: msg.mode,
        payload: msg.payload.as_str().into(),
        language: msg.language.as_str().into(),
      volume: msg.volume,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      mode: msg.mode,
      payload: msg.payload.to_string(),
      language: msg.language.to_string(),
      volume: msg.volume,
    }
  }
}


// Corresponds to musia_msgs__srv__PlayAudio_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct PlayAudio_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub duration_s: f32,

}



impl Default for PlayAudio_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::PlayAudio_Response::default())
  }
}

impl rosidl_runtime_rs::Message for PlayAudio_Response {
  type RmwMsg = super::srv::rmw::PlayAudio_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        success: msg.success,
        duration_s: msg.duration_s,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      success: msg.success,
      duration_s: msg.duration_s,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      success: msg.success,
      duration_s: msg.duration_s,
    }
  }
}


// Corresponds to musia_msgs__srv__DetectPerson_Request

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct DetectPerson_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub structure_needs_at_least_one_member: u8,

}



impl Default for DetectPerson_Request {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::DetectPerson_Request::default())
  }
}

impl rosidl_runtime_rs::Message for DetectPerson_Request {
  type RmwMsg = super::srv::rmw::DetectPerson_Request;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      structure_needs_at_least_one_member: msg.structure_needs_at_least_one_member,
    }
  }
}


// Corresponds to musia_msgs__srv__DetectPerson_Response

// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct DetectPerson_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub person_detected: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub distance_m: f32,


    // This member is not documented.
    #[allow(missing_docs)]
    pub confidence: f32,

}



impl Default for DetectPerson_Response {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::srv::rmw::DetectPerson_Response::default())
  }
}

impl rosidl_runtime_rs::Message for DetectPerson_Response {
  type RmwMsg = super::srv::rmw::DetectPerson_Response;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        person_detected: msg.person_detected,
        distance_m: msg.distance_m,
        confidence: msg.confidence,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
      person_detected: msg.person_detected,
      distance_m: msg.distance_m,
      confidence: msg.confidence,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      person_detected: msg.person_detected,
      distance_m: msg.distance_m,
      confidence: msg.confidence,
    }
  }
}






#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__SetTourMode() -> *const std::ffi::c_void;
}

// Corresponds to musia_msgs__srv__SetTourMode
#[allow(missing_docs, non_camel_case_types)]
pub struct SetTourMode;

impl rosidl_runtime_rs::Service for SetTourMode {
    type Request = SetTourMode_Request;
    type Response = SetTourMode_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__SetTourMode() }
    }
}




#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__GetCurrentZone() -> *const std::ffi::c_void;
}

// Corresponds to musia_msgs__srv__GetCurrentZone
#[allow(missing_docs, non_camel_case_types)]
pub struct GetCurrentZone;

impl rosidl_runtime_rs::Service for GetCurrentZone {
    type Request = GetCurrentZone_Request;
    type Response = GetCurrentZone_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__GetCurrentZone() }
    }
}




#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__NavigateToPOI() -> *const std::ffi::c_void;
}

// Corresponds to musia_msgs__srv__NavigateToPOI
#[allow(missing_docs, non_camel_case_types)]
pub struct NavigateToPOI;

impl rosidl_runtime_rs::Service for NavigateToPOI {
    type Request = NavigateToPOI_Request;
    type Response = NavigateToPOI_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__NavigateToPOI() }
    }
}




#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__PlayAudio() -> *const std::ffi::c_void;
}

// Corresponds to musia_msgs__srv__PlayAudio
#[allow(missing_docs, non_camel_case_types)]
pub struct PlayAudio;

impl rosidl_runtime_rs::Service for PlayAudio {
    type Request = PlayAudio_Request;
    type Response = PlayAudio_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__PlayAudio() }
    }
}




#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__DetectPerson() -> *const std::ffi::c_void;
}

// Corresponds to musia_msgs__srv__DetectPerson
#[allow(missing_docs, non_camel_case_types)]
pub struct DetectPerson;

impl rosidl_runtime_rs::Service for DetectPerson {
    type Request = DetectPerson_Request;
    type Response = DetectPerson_Response;

    fn get_type_support() -> *const std::ffi::c_void {
        // SAFETY: No preconditions for this function.
        unsafe { rosidl_typesupport_c__get_service_type_support_handle__musia_msgs__srv__DetectPerson() }
    }
}


