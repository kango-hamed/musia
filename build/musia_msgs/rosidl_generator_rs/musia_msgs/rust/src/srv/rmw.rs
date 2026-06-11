#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};



#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__SetTourMode_Request() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__SetTourMode_Request__init(msg: *mut SetTourMode_Request) -> bool;
    fn musia_msgs__srv__SetTourMode_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Request>, size: usize) -> bool;
    fn musia_msgs__srv__SetTourMode_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Request>);
    fn musia_msgs__srv__SetTourMode_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<SetTourMode_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Request>) -> bool;
}

// Corresponds to musia_msgs__srv__SetTourMode_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetTourMode_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub target_state: u8,

}



impl Default for SetTourMode_Request {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__SetTourMode_Request__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__SetTourMode_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for SetTourMode_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for SetTourMode_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for SetTourMode_Request where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/SetTourMode_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__SetTourMode_Request() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__SetTourMode_Response() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__SetTourMode_Response__init(msg: *mut SetTourMode_Response) -> bool;
    fn musia_msgs__srv__SetTourMode_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Response>, size: usize) -> bool;
    fn musia_msgs__srv__SetTourMode_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Response>);
    fn musia_msgs__srv__SetTourMode_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<SetTourMode_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<SetTourMode_Response>) -> bool;
}

// Corresponds to musia_msgs__srv__SetTourMode_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct SetTourMode_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub message: rosidl_runtime_rs::String,

}



impl Default for SetTourMode_Response {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__SetTourMode_Response__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__SetTourMode_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for SetTourMode_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__SetTourMode_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for SetTourMode_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for SetTourMode_Response where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/SetTourMode_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__SetTourMode_Response() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__GetCurrentZone_Request() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__GetCurrentZone_Request__init(msg: *mut GetCurrentZone_Request) -> bool;
    fn musia_msgs__srv__GetCurrentZone_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Request>, size: usize) -> bool;
    fn musia_msgs__srv__GetCurrentZone_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Request>);
    fn musia_msgs__srv__GetCurrentZone_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<GetCurrentZone_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Request>) -> bool;
}

// Corresponds to musia_msgs__srv__GetCurrentZone_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct GetCurrentZone_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub structure_needs_at_least_one_member: u8,

}



impl Default for GetCurrentZone_Request {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__GetCurrentZone_Request__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__GetCurrentZone_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for GetCurrentZone_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for GetCurrentZone_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for GetCurrentZone_Request where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/GetCurrentZone_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__GetCurrentZone_Request() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__GetCurrentZone_Response() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__GetCurrentZone_Response__init(msg: *mut GetCurrentZone_Response) -> bool;
    fn musia_msgs__srv__GetCurrentZone_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Response>, size: usize) -> bool;
    fn musia_msgs__srv__GetCurrentZone_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Response>);
    fn musia_msgs__srv__GetCurrentZone_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<GetCurrentZone_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<GetCurrentZone_Response>) -> bool;
}

// Corresponds to musia_msgs__srv__GetCurrentZone_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct GetCurrentZone_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub zone_name: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_waypoint: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,

}



impl Default for GetCurrentZone_Response {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__GetCurrentZone_Response__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__GetCurrentZone_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for GetCurrentZone_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__GetCurrentZone_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for GetCurrentZone_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for GetCurrentZone_Response where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/GetCurrentZone_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__GetCurrentZone_Response() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__NavigateToPOI_Request() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__NavigateToPOI_Request__init(msg: *mut NavigateToPOI_Request) -> bool;
    fn musia_msgs__srv__NavigateToPOI_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Request>, size: usize) -> bool;
    fn musia_msgs__srv__NavigateToPOI_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Request>);
    fn musia_msgs__srv__NavigateToPOI_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<NavigateToPOI_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Request>) -> bool;
}

// Corresponds to musia_msgs__srv__NavigateToPOI_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
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
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__NavigateToPOI_Request__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__NavigateToPOI_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for NavigateToPOI_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for NavigateToPOI_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for NavigateToPOI_Request where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/NavigateToPOI_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__NavigateToPOI_Request() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__NavigateToPOI_Response() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__NavigateToPOI_Response__init(msg: *mut NavigateToPOI_Response) -> bool;
    fn musia_msgs__srv__NavigateToPOI_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Response>, size: usize) -> bool;
    fn musia_msgs__srv__NavigateToPOI_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Response>);
    fn musia_msgs__srv__NavigateToPOI_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<NavigateToPOI_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<NavigateToPOI_Response>) -> bool;
}

// Corresponds to musia_msgs__srv__NavigateToPOI_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct NavigateToPOI_Response {

    // This member is not documented.
    #[allow(missing_docs)]
    pub success: bool,


    // This member is not documented.
    #[allow(missing_docs)]
    pub message: rosidl_runtime_rs::String,

}



impl Default for NavigateToPOI_Response {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__NavigateToPOI_Response__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__NavigateToPOI_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for NavigateToPOI_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__NavigateToPOI_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for NavigateToPOI_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for NavigateToPOI_Response where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/NavigateToPOI_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__NavigateToPOI_Response() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__PlayAudio_Request() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__PlayAudio_Request__init(msg: *mut PlayAudio_Request) -> bool;
    fn musia_msgs__srv__PlayAudio_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Request>, size: usize) -> bool;
    fn musia_msgs__srv__PlayAudio_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Request>);
    fn musia_msgs__srv__PlayAudio_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<PlayAudio_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Request>) -> bool;
}

// Corresponds to musia_msgs__srv__PlayAudio_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct PlayAudio_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub mode: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub payload: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub language: rosidl_runtime_rs::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub volume: f32,

}



impl Default for PlayAudio_Request {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__PlayAudio_Request__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__PlayAudio_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for PlayAudio_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for PlayAudio_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for PlayAudio_Request where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/PlayAudio_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__PlayAudio_Request() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__PlayAudio_Response() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__PlayAudio_Response__init(msg: *mut PlayAudio_Response) -> bool;
    fn musia_msgs__srv__PlayAudio_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Response>, size: usize) -> bool;
    fn musia_msgs__srv__PlayAudio_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Response>);
    fn musia_msgs__srv__PlayAudio_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<PlayAudio_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<PlayAudio_Response>) -> bool;
}

// Corresponds to musia_msgs__srv__PlayAudio_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
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
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__PlayAudio_Response__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__PlayAudio_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for PlayAudio_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__PlayAudio_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for PlayAudio_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for PlayAudio_Response where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/PlayAudio_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__PlayAudio_Response() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__DetectPerson_Request() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__DetectPerson_Request__init(msg: *mut DetectPerson_Request) -> bool;
    fn musia_msgs__srv__DetectPerson_Request__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Request>, size: usize) -> bool;
    fn musia_msgs__srv__DetectPerson_Request__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Request>);
    fn musia_msgs__srv__DetectPerson_Request__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<DetectPerson_Request>, out_seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Request>) -> bool;
}

// Corresponds to musia_msgs__srv__DetectPerson_Request
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct DetectPerson_Request {

    // This member is not documented.
    #[allow(missing_docs)]
    pub structure_needs_at_least_one_member: u8,

}



impl Default for DetectPerson_Request {
  fn default() -> Self {
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__DetectPerson_Request__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__DetectPerson_Request__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for DetectPerson_Request {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Request__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Request__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Request__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for DetectPerson_Request {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for DetectPerson_Request where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/DetectPerson_Request";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__DetectPerson_Request() }
  }
}


#[link(name = "musia_msgs__rosidl_typesupport_c")]
extern "C" {
    fn rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__DetectPerson_Response() -> *const std::ffi::c_void;
}

#[link(name = "musia_msgs__rosidl_generator_c")]
extern "C" {
    fn musia_msgs__srv__DetectPerson_Response__init(msg: *mut DetectPerson_Response) -> bool;
    fn musia_msgs__srv__DetectPerson_Response__Sequence__init(seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Response>, size: usize) -> bool;
    fn musia_msgs__srv__DetectPerson_Response__Sequence__fini(seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Response>);
    fn musia_msgs__srv__DetectPerson_Response__Sequence__copy(in_seq: &rosidl_runtime_rs::Sequence<DetectPerson_Response>, out_seq: *mut rosidl_runtime_rs::Sequence<DetectPerson_Response>) -> bool;
}

// Corresponds to musia_msgs__srv__DetectPerson_Response
#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]


// This struct is not documented.
#[allow(missing_docs)]

#[allow(non_camel_case_types)]
#[repr(C)]
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
    unsafe {
      let mut msg = std::mem::zeroed();
      if !musia_msgs__srv__DetectPerson_Response__init(&mut msg as *mut _) {
        panic!("Call to musia_msgs__srv__DetectPerson_Response__init() failed");
      }
      msg
    }
  }
}

impl rosidl_runtime_rs::SequenceAlloc for DetectPerson_Response {
  fn sequence_init(seq: &mut rosidl_runtime_rs::Sequence<Self>, size: usize) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Response__Sequence__init(seq as *mut _, size) }
  }
  fn sequence_fini(seq: &mut rosidl_runtime_rs::Sequence<Self>) {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Response__Sequence__fini(seq as *mut _) }
  }
  fn sequence_copy(in_seq: &rosidl_runtime_rs::Sequence<Self>, out_seq: &mut rosidl_runtime_rs::Sequence<Self>) -> bool {
    // SAFETY: This is safe since the pointer is guaranteed to be valid/initialized.
    unsafe { musia_msgs__srv__DetectPerson_Response__Sequence__copy(in_seq, out_seq as *mut _) }
  }
}

impl rosidl_runtime_rs::Message for DetectPerson_Response {
  type RmwMsg = Self;
  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> { msg_cow }
  fn from_rmw_message(msg: Self::RmwMsg) -> Self { msg }
}

impl rosidl_runtime_rs::RmwMessage for DetectPerson_Response where Self: Sized {
  const TYPE_NAME: &'static str = "musia_msgs/srv/DetectPerson_Response";
  fn get_type_support() -> *const std::ffi::c_void {
    // SAFETY: No preconditions for this function.
    unsafe { rosidl_typesupport_c__get_message_type_support_handle__musia_msgs__srv__DetectPerson_Response() }
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


