// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:srv/DetectPerson.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/detect_person.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__DETECT_PERSON__BUILDER_HPP_
#define MUSIA_MSGS__SRV__DETAIL__DETECT_PERSON__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/srv/detail/detect_person__struct.hpp"
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
auto build<::musia_msgs::srv::DetectPerson_Request>()
{
  return ::musia_msgs::srv::DetectPerson_Request(rosidl_runtime_cpp::MessageInitialization::ZERO);
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_DetectPerson_Response_confidence
{
public:
  explicit Init_DetectPerson_Response_confidence(::musia_msgs::srv::DetectPerson_Response & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::DetectPerson_Response confidence(::musia_msgs::srv::DetectPerson_Response::_confidence_type arg)
  {
    msg_.confidence = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Response msg_;
};

class Init_DetectPerson_Response_distance_m
{
public:
  explicit Init_DetectPerson_Response_distance_m(::musia_msgs::srv::DetectPerson_Response & msg)
  : msg_(msg)
  {}
  Init_DetectPerson_Response_confidence distance_m(::musia_msgs::srv::DetectPerson_Response::_distance_m_type arg)
  {
    msg_.distance_m = std::move(arg);
    return Init_DetectPerson_Response_confidence(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Response msg_;
};

class Init_DetectPerson_Response_person_detected
{
public:
  Init_DetectPerson_Response_person_detected()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_DetectPerson_Response_distance_m person_detected(::musia_msgs::srv::DetectPerson_Response::_person_detected_type arg)
  {
    msg_.person_detected = std::move(arg);
    return Init_DetectPerson_Response_distance_m(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Response msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::DetectPerson_Response>()
{
  return musia_msgs::srv::builder::Init_DetectPerson_Response_person_detected();
}

}  // namespace musia_msgs


namespace musia_msgs
{

namespace srv
{

namespace builder
{

class Init_DetectPerson_Event_response
{
public:
  explicit Init_DetectPerson_Event_response(::musia_msgs::srv::DetectPerson_Event & msg)
  : msg_(msg)
  {}
  ::musia_msgs::srv::DetectPerson_Event response(::musia_msgs::srv::DetectPerson_Event::_response_type arg)
  {
    msg_.response = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Event msg_;
};

class Init_DetectPerson_Event_request
{
public:
  explicit Init_DetectPerson_Event_request(::musia_msgs::srv::DetectPerson_Event & msg)
  : msg_(msg)
  {}
  Init_DetectPerson_Event_response request(::musia_msgs::srv::DetectPerson_Event::_request_type arg)
  {
    msg_.request = std::move(arg);
    return Init_DetectPerson_Event_response(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Event msg_;
};

class Init_DetectPerson_Event_info
{
public:
  Init_DetectPerson_Event_info()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_DetectPerson_Event_request info(::musia_msgs::srv::DetectPerson_Event::_info_type arg)
  {
    msg_.info = std::move(arg);
    return Init_DetectPerson_Event_request(msg_);
  }

private:
  ::musia_msgs::srv::DetectPerson_Event msg_;
};

}  // namespace builder

}  // namespace srv

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::srv::DetectPerson_Event>()
{
  return musia_msgs::srv::builder::Init_DetectPerson_Event_info();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__SRV__DETAIL__DETECT_PERSON__BUILDER_HPP_
