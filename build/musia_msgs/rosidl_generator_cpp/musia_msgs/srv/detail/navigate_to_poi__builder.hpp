// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:srv/NavigateToPOI.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/navigate_to_poi.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__NAVIGATE_TO_POI__BUILDER_HPP_
#define MUSIA_MSGS__SRV__DETAIL__NAVIGATE_TO_POI__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/srv/detail/navigate_to_poi__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_NavigateToPOI_Request_cancel
{
public:
  explicit Init_NavigateToPOI_Request_cancel(::musia_msgs::srv::NavigateToPOI_Request & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::NavigateToPOI_Request cancel(::musia_msgs::srv::NavigateToPOI_Request::_cancel_type arg)
  {
    msg_.cancel = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Request msg_;
};

class Init_NavigateToPOI_Request_waypoint_id
{
public:
  Init_NavigateToPOI_Request_waypoint_id()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_NavigateToPOI_Request_cancel waypoint_id(::musia_msgs::srv::NavigateToPOI_Request::_waypoint_id_type arg)
  {
    msg_.waypoint_id = std::move(arg);
    return Init_NavigateToPOI_Request_cancel(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Request msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::NavigateToPOI_Request>()
{
  return musia_msgs::srv::builder::Init_NavigateToPOI_Request_waypoint_id();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_NavigateToPOI_Response_message
{
public:
  explicit Init_NavigateToPOI_Response_message(::musia_msgs::srv::NavigateToPOI_Response & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::NavigateToPOI_Response message(::musia_msgs::srv::NavigateToPOI_Response::_message_type arg)
  {
    msg_.message = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Response msg_;
};

class Init_NavigateToPOI_Response_success
{
public:
  Init_NavigateToPOI_Response_success()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_NavigateToPOI_Response_message success(::musia_msgs::srv::NavigateToPOI_Response::_success_type arg)
  {
    msg_.success = std::move(arg);
    return Init_NavigateToPOI_Response_message(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::NavigateToPOI_Response>()
{
  return musia_msgs::srv::builder::Init_NavigateToPOI_Response_success();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_NavigateToPOI_Event_response
{
public:
  explicit Init_NavigateToPOI_Event_response(::musia_msgs::srv::NavigateToPOI_Event & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::NavigateToPOI_Event response(::musia_msgs::srv::NavigateToPOI_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Event msg_;
};

class Init_NavigateToPOI_Event_request
{
public:
  explicit Init_NavigateToPOI_Event_request(::musia_msgs::srv::NavigateToPOI_Event & msg)
  : msg_(msg)
  {}
  Init_NavigateToPOI_Event_response request(::musia_msgs::srv::NavigateToPOI_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_NavigateToPOI_Event_response(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Event msg_;
};

class Init_NavigateToPOI_Event_info
{
public:
  Init_NavigateToPOI_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_NavigateToPOI_Event_request info(::musia_msgs::srv::NavigateToPOI_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_NavigateToPOI_Event_request(msg_);
  }

private:
  ::musia_msgs::srv::NavigateToPOI_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::NavigateToPOI_Event>()
{
  return musia_msgs::srv::builder::Init_NavigateToPOI_Event_info();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__NAVIGATE_TO_POI__BUILDER_HPP_
