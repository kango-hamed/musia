// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:srv/GetCurrentZone.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/get_current_zone.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__BUILDER_HPP_
#define MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/srv/detail/get_current_zone__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace srv
{


}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::GetCurrentZone_Request>()
{
  return ::musia_msgs::srv::GetCurrentZone_Request(rosidl_runtime_cpp::MessageInitialization::ZERO);
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_GetCurrentZone_Response_success
{
public:
  explicit Init_GetCurrentZone_Response_success(::musia_msgs::srv::GetCurrentZone_Response & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::GetCurrentZone_Response success(::musia_msgs::srv::GetCurrentZone_Response::_success_type arg)
  {
    msg_.success = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Response msg_;
};

class Init_GetCurrentZone_Response_current_waypoint
{
public:
  explicit Init_GetCurrentZone_Response_current_waypoint(::musia_msgs::srv::GetCurrentZone_Response & msg)
  : msg_(msg)
  {}
  Init_GetCurrentZone_Response_success current_waypoint(::musia_msgs::srv::GetCurrentZone_Response::_current_waypoint_type arg)
  {
    msg_.current_waypoint = std::move(arg);
    return Init_GetCurrentZone_Response_success(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Response msg_;
};

class Init_GetCurrentZone_Response_zone_name
{
public:
  Init_GetCurrentZone_Response_zone_name()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_GetCurrentZone_Response_current_waypoint zone_name(::musia_msgs::srv::GetCurrentZone_Response::_zone_name_type arg)
  {
    msg_.zone_name = std::move(arg);
    return Init_GetCurrentZone_Response_current_waypoint(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::GetCurrentZone_Response>()
{
  return musia_msgs::srv::builder::Init_GetCurrentZone_Response_zone_name();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_GetCurrentZone_Event_response
{
public:
  explicit Init_GetCurrentZone_Event_response(::musia_msgs::srv::GetCurrentZone_Event & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::GetCurrentZone_Event response(::musia_msgs::srv::GetCurrentZone_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Event msg_;
};

class Init_GetCurrentZone_Event_request
{
public:
  explicit Init_GetCurrentZone_Event_request(::musia_msgs::srv::GetCurrentZone_Event & msg)
  : msg_(msg)
  {}
  Init_GetCurrentZone_Event_response request(::musia_msgs::srv::GetCurrentZone_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_GetCurrentZone_Event_response(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Event msg_;
};

class Init_GetCurrentZone_Event_info
{
public:
  Init_GetCurrentZone_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_GetCurrentZone_Event_request info(::musia_msgs::srv::GetCurrentZone_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_GetCurrentZone_Event_request(msg_);
  }

private:
  ::musia_msgs::srv::GetCurrentZone_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::GetCurrentZone_Event>()
{
  return musia_msgs::srv::builder::Init_GetCurrentZone_Event_info();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__BUILDER_HPP_
