#[cfg(feature = "serde")]
use serde::{Deserialize, Serialize};



// Corresponds to musia_msgs__msg__TourState

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct TourState {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::Header,


    // This member is not documented.
    #[allow(missing_docs)]
    pub state: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub state_label: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_zone: std::string::String,


    // This member is not documented.
    #[allow(missing_docs)]
    pub current_waypoint: u8,


    // This member is not documented.
    #[allow(missing_docs)]
    pub network_available: bool,

}

impl TourState {

    // This constant is not documented.
    #[allow(missing_docs)]
    pub const VEILLE: u8 = 0;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const ACCUEIL: u8 = 1;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const TRAITEMENT: u8 = 2;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const GUIDAGE: u8 = 3;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const PRESENTATION: u8 = 4;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const DEGRADE: u8 = 5;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const RETOUR: u8 = 6;

}


impl Default for TourState {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::TourState::default())
  }
}

impl rosidl_runtime_rs::Message for TourState {
  type RmwMsg = super::msg::rmw::TourState;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Owned(msg.header)).into_owned(),
        state: msg.state,
        state_label: msg.state_label.as_str().into(),
        current_zone: msg.current_zone.as_str().into(),
        current_waypoint: msg.current_waypoint,
        network_available: msg.network_available,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Borrowed(&msg.header)).into_owned(),
      state: msg.state,
        state_label: msg.state_label.as_str().into(),
        current_zone: msg.current_zone.as_str().into(),
      current_waypoint: msg.current_waypoint,
      network_available: msg.network_available,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      header: std_msgs::msg::Header::from_rmw_message(msg.header),
      state: msg.state,
      state_label: msg.state_label.to_string(),
      current_zone: msg.current_zone.to_string(),
      current_waypoint: msg.current_waypoint,
      network_available: msg.network_available,
    }
  }
}


// Corresponds to musia_msgs__msg__PersonDetection

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct PersonDetection {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::Header,


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



impl Default for PersonDetection {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::PersonDetection::default())
  }
}

impl rosidl_runtime_rs::Message for PersonDetection {
  type RmwMsg = super::msg::rmw::PersonDetection;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Owned(msg.header)).into_owned(),
        person_detected: msg.person_detected,
        distance_m: msg.distance_m,
        confidence: msg.confidence,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Borrowed(&msg.header)).into_owned(),
      person_detected: msg.person_detected,
      distance_m: msg.distance_m,
      confidence: msg.confidence,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      header: std_msgs::msg::Header::from_rmw_message(msg.header),
      person_detected: msg.person_detected,
      distance_m: msg.distance_m,
      confidence: msg.confidence,
    }
  }
}


// Corresponds to musia_msgs__msg__AudioCommand

// This struct is not documented.
#[allow(missing_docs)]

#[cfg_attr(feature = "serde", derive(Deserialize, Serialize))]
#[derive(Clone, Debug, PartialEq, PartialOrd)]
pub struct AudioCommand {

    // This member is not documented.
    #[allow(missing_docs)]
    pub header: std_msgs::msg::Header,


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

impl AudioCommand {

    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_FILE: u8 = 0;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_TTS_OFFLINE: u8 = 1;


    // This constant is not documented.
    #[allow(missing_docs)]
    pub const MODE_TTS_ONLINE: u8 = 2;

}


impl Default for AudioCommand {
  fn default() -> Self {
    <Self as rosidl_runtime_rs::Message>::from_rmw_message(super::msg::rmw::AudioCommand::default())
  }
}

impl rosidl_runtime_rs::Message for AudioCommand {
  type RmwMsg = super::msg::rmw::AudioCommand;

  fn into_rmw_message(msg_cow: std::borrow::Cow<'_, Self>) -> std::borrow::Cow<'_, Self::RmwMsg> {
    match msg_cow {
      std::borrow::Cow::Owned(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Owned(msg.header)).into_owned(),
        mode: msg.mode,
        payload: msg.payload.as_str().into(),
        language: msg.language.as_str().into(),
        volume: msg.volume,
      }),
      std::borrow::Cow::Borrowed(msg) => std::borrow::Cow::Owned(Self::RmwMsg {
        header: std_msgs::msg::Header::into_rmw_message(std::borrow::Cow::Borrowed(&msg.header)).into_owned(),
      mode: msg.mode,
        payload: msg.payload.as_str().into(),
        language: msg.language.as_str().into(),
      volume: msg.volume,
      })
    }
  }

  fn from_rmw_message(msg: Self::RmwMsg) -> Self {
    Self {
      header: std_msgs::msg::Header::from_rmw_message(msg.header),
      mode: msg.mode,
      payload: msg.payload.to_string(),
      language: msg.language.to_string(),
      volume: msg.volume,
    }
  }
}


