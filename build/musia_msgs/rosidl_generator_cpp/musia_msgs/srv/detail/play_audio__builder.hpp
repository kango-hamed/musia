// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:srv/PlayAudio.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/play_audio.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__BUILDER_HPP_
#define MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/srv/detail/play_audio__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_PlayAudio_Request_volume
{
public:
  explicit Init_PlayAudio_Request_volume(::musia_msgs::srv::PlayAudio_Request & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::PlayAudio_Request volume(::musia_msgs::srv::PlayAudio_Request::_volume_type arg)
  {
    msg_.volume = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Request msg_;
};

class Init_PlayAudio_Request_language
{
public:
  explicit Init_PlayAudio_Request_language(::musia_msgs::srv::PlayAudio_Request & msg)
  : msg_(msg)
  {}
  Init_PlayAudio_Request_volume language(::musia_msgs::srv::PlayAudio_Request::_language_type arg)
  {
    msg_.language = std::move(arg);
    return Init_PlayAudio_Request_volume(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Request msg_;
};

class Init_PlayAudio_Request_payload
{
public:
  explicit Init_PlayAudio_Request_payload(::musia_msgs::srv::PlayAudio_Request & msg)
  : msg_(msg)
  {}
  Init_PlayAudio_Request_language payload(::musia_msgs::srv::PlayAudio_Request::_payload_type arg)
  {
    msg_.payload = std::move(arg);
    return Init_PlayAudio_Request_language(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Request msg_;
};

class Init_PlayAudio_Request_mode
{
public:
  Init_PlayAudio_Request_mode()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_PlayAudio_Request_payload mode(::musia_msgs::srv::PlayAudio_Request::_mode_type arg)
  {
    msg_.mode = std::move(arg);
    return Init_PlayAudio_Request_payload(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Request msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::PlayAudio_Request>()
{
  return musia_msgs::srv::builder::Init_PlayAudio_Request_mode();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_PlayAudio_Response_duration_s
{
public:
  explicit Init_PlayAudio_Response_duration_s(::musia_msgs::srv::PlayAudio_Response & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::PlayAudio_Response duration_s(::musia_msgs::srv::PlayAudio_Response::_duration_s_type arg)
  {
    msg_.duration_s = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Response msg_;
};

class Init_PlayAudio_Response_success
{
public:
  Init_PlayAudio_Response_success()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_PlayAudio_Response_duration_s success(::musia_msgs::srv::PlayAudio_Response::_success_type arg)
  {
    msg_.success = std::move(arg);
    return Init_PlayAudio_Response_duration_s(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::PlayAudio_Response>()
{
  return musia_msgs::srv::builder::Init_PlayAudio_Response_success();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_PlayAudio_Event_response
{
public:
  explicit Init_PlayAudio_Event_response(::musia_msgs::srv::PlayAudio_Event & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::PlayAudio_Event response(::musia_msgs::srv::PlayAudio_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Event msg_;
};

class Init_PlayAudio_Event_request
{
public:
  explicit Init_PlayAudio_Event_request(::musia_msgs::srv::PlayAudio_Event & msg)
  : msg_(msg)
  {}
  Init_PlayAudio_Event_response request(::musia_msgs::srv::PlayAudio_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_PlayAudio_Event_response(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Event msg_;
};

class Init_PlayAudio_Event_info
{
public:
  Init_PlayAudio_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_PlayAudio_Event_request info(::musia_msgs::srv::PlayAudio_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_PlayAudio_Event_request(msg_);
  }

private:
  ::musia_msgs::srv::PlayAudio_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::PlayAudio_Event>()
{
  return musia_msgs::srv::builder::Init_PlayAudio_Event_info();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__BUILDER_HPP_
