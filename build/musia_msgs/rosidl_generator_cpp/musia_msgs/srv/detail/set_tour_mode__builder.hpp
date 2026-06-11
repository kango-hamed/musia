// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:srv/SetTourMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/set_tour_mode.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__BUILDER_HPP_
#define MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/srv/detail/set_tour_mode__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_SetTourMode_Request_target_state
{
public:
  Init_SetTourMode_Request_target_state()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  ::musia_msgs::srv::SetTourMode_Request target_state(::musia_msgs::srv::SetTourMode_Request::_target_state_type arg)
  {
    msg_.target_state = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Request msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::SetTourMode_Request>()
{
  return musia_msgs::srv::builder::Init_SetTourMode_Request_target_state();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_SetTourMode_Response_message
{
public:
  explicit Init_SetTourMode_Response_message(::musia_msgs::srv::SetTourMode_Response & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::SetTourMode_Response message(::musia_msgs::srv::SetTourMode_Response::_message_type arg)
  {
    msg_.message = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Response msg_;
};

class Init_SetTourMode_Response_success
{
public:
  Init_SetTourMode_Response_success()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_SetTourMode_Response_message success(::musia_msgs::srv::SetTourMode_Response::_success_type arg)
  {
    msg_.success = std::move(arg);
    return Init_SetTourMode_Response_message(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::SetTourMode_Response>()
{
  return musia_msgs::srv::builder::Init_SetTourMode_Response_success();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_SetTourMode_Event_response
{
public:
  explicit Init_SetTourMode_Event_response(::musia_msgs::srv::SetTourMode_Event & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::SetTourMode_Event response(::musia_msgs::srv::SetTourMode_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Event msg_;
};

class Init_SetTourMode_Event_request
{
public:
  explicit Init_SetTourMode_Event_request(::musia_msgs::srv::SetTourMode_Event & msg)
  : msg_(msg)
  {}
  Init_SetTourMode_Event_response request(::musia_msgs::srv::SetTourMode_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_SetTourMode_Event_response(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Event msg_;
};

class Init_SetTourMode_Event_info
{
public:
  Init_SetTourMode_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_SetTourMode_Event_request info(::musia_msgs::srv::SetTourMode_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_SetTourMode_Event_request(msg_);
  }

private:
  ::musia_msgs::srv::SetTourMode_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::SetTourMode_Event>()
{
  return musia_msgs::srv::builder::Init_SetTourMode_Event_info();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__BUILDER_HPP_
