// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from musia_msgs:srv/NavigateToPOI.idl
// generated code does not contain a copyright notice
#include "musia_msgs/srv/detail/navigate_to_poi__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"

bool
musia_msgs__srv__NavigateToPOI_Request__init(musia_msgs__srv__NavigateToPOI_Request * msg)
{
  if (!msg) {
    return false;
  }
  // waypoint_id
  // cancel
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Request__fini(musia_msgs__srv__NavigateToPOI_Request * msg)
{
  if (!msg) {
    return;
  }
  // waypoint_id
  // cancel
}

bool
musia_msgs__srv__NavigateToPOI_Request__are_equal(const musia_msgs__srv__NavigateToPOI_Request * lhs, const musia_msgs__srv__NavigateToPOI_Request * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // waypoint_id
  if (lhs->waypoint_id != rhs->waypoint_id) {
    return false;
  }
  // cancel
  if (lhs->cancel != rhs->cancel) {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Request__copy(
  const musia_msgs__srv__NavigateToPOI_Request * input,
  musia_msgs__srv__NavigateToPOI_Request * output)
{
  if (!input || !output) {
    return false;
  }
  // waypoint_id
  output->waypoint_id = input->waypoint_id;
  // cancel
  output->cancel = input->cancel;
  return true;
}

musia_msgs__srv__NavigateToPOI_Request *
musia_msgs__srv__NavigateToPOI_Request__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Request * msg = (musia_msgs__srv__NavigateToPOI_Request *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Request), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__NavigateToPOI_Request));
  bool success = musia_msgs__srv__NavigateToPOI_Request__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__NavigateToPOI_Request__destroy(musia_msgs__srv__NavigateToPOI_Request * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__NavigateToPOI_Request__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__NavigateToPOI_Request__Sequence__init(musia_msgs__srv__NavigateToPOI_Request__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Request * data = NULL;

  if (size) {
    data = (musia_msgs__srv__NavigateToPOI_Request *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__NavigateToPOI_Request), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__NavigateToPOI_Request__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__NavigateToPOI_Request__fini(&data[i - 1]);
      }
      allocator.deallocate(data, allocator.state);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Request__Sequence__fini(musia_msgs__srv__NavigateToPOI_Request__Sequence * array)
{
  if (!array) {
    return;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();

  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      musia_msgs__srv__NavigateToPOI_Request__fini(&array->data[i]);
    }
    allocator.deallocate(array->data, allocator.state);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

musia_msgs__srv__NavigateToPOI_Request__Sequence *
musia_msgs__srv__NavigateToPOI_Request__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Request__Sequence * array = (musia_msgs__srv__NavigateToPOI_Request__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Request__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__NavigateToPOI_Request__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__NavigateToPOI_Request__Sequence__destroy(musia_msgs__srv__NavigateToPOI_Request__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__NavigateToPOI_Request__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__NavigateToPOI_Request__Sequence__are_equal(const musia_msgs__srv__NavigateToPOI_Request__Sequence * lhs, const musia_msgs__srv__NavigateToPOI_Request__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Request__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Request__Sequence__copy(
  const musia_msgs__srv__NavigateToPOI_Request__Sequence * input,
  musia_msgs__srv__NavigateToPOI_Request__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__NavigateToPOI_Request);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__NavigateToPOI_Request * data =
      (musia_msgs__srv__NavigateToPOI_Request *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__NavigateToPOI_Request__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__NavigateToPOI_Request__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Request__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `message`
#include "rosidl_runtime_c/string_functions.h"

bool
musia_msgs__srv__NavigateToPOI_Response__init(musia_msgs__srv__NavigateToPOI_Response * msg)
{
  if (!msg) {
    return false;
  }
  // success
  // message
  if (!rosidl_runtime_c__String__init(&msg->message)) {
    musia_msgs__srv__NavigateToPOI_Response__fini(msg);
    return false;
  }
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Response__fini(musia_msgs__srv__NavigateToPOI_Response * msg)
{
  if (!msg) {
    return;
  }
  // success
  // message
  rosidl_runtime_c__String__fini(&msg->message);
}

bool
musia_msgs__srv__NavigateToPOI_Response__are_equal(const musia_msgs__srv__NavigateToPOI_Response * lhs, const musia_msgs__srv__NavigateToPOI_Response * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // success
  if (lhs->success != rhs->success) {
    return false;
  }
  // message
  if (!rosidl_runtime_c__String__are_equal(
      &(lhs->message), &(rhs->message)))
  {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Response__copy(
  const musia_msgs__srv__NavigateToPOI_Response * input,
  musia_msgs__srv__NavigateToPOI_Response * output)
{
  if (!input || !output) {
    return false;
  }
  // success
  output->success = input->success;
  // message
  if (!rosidl_runtime_c__String__copy(
      &(input->message), &(output->message)))
  {
    return false;
  }
  return true;
}

musia_msgs__srv__NavigateToPOI_Response *
musia_msgs__srv__NavigateToPOI_Response__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Response * msg = (musia_msgs__srv__NavigateToPOI_Response *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Response), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__NavigateToPOI_Response));
  bool success = musia_msgs__srv__NavigateToPOI_Response__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__NavigateToPOI_Response__destroy(musia_msgs__srv__NavigateToPOI_Response * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__NavigateToPOI_Response__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__NavigateToPOI_Response__Sequence__init(musia_msgs__srv__NavigateToPOI_Response__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Response * data = NULL;

  if (size) {
    data = (musia_msgs__srv__NavigateToPOI_Response *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__NavigateToPOI_Response), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__NavigateToPOI_Response__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__NavigateToPOI_Response__fini(&data[i - 1]);
      }
      allocator.deallocate(data, allocator.state);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Response__Sequence__fini(musia_msgs__srv__NavigateToPOI_Response__Sequence * array)
{
  if (!array) {
    return;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();

  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      musia_msgs__srv__NavigateToPOI_Response__fini(&array->data[i]);
    }
    allocator.deallocate(array->data, allocator.state);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

musia_msgs__srv__NavigateToPOI_Response__Sequence *
musia_msgs__srv__NavigateToPOI_Response__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Response__Sequence * array = (musia_msgs__srv__NavigateToPOI_Response__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Response__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__NavigateToPOI_Response__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__NavigateToPOI_Response__Sequence__destroy(musia_msgs__srv__NavigateToPOI_Response__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__NavigateToPOI_Response__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__NavigateToPOI_Response__Sequence__are_equal(const musia_msgs__srv__NavigateToPOI_Response__Sequence * lhs, const musia_msgs__srv__NavigateToPOI_Response__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Response__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Response__Sequence__copy(
  const musia_msgs__srv__NavigateToPOI_Response__Sequence * input,
  musia_msgs__srv__NavigateToPOI_Response__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__NavigateToPOI_Response);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__NavigateToPOI_Response * data =
      (musia_msgs__srv__NavigateToPOI_Response *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__NavigateToPOI_Response__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__NavigateToPOI_Response__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Response__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


// Include directives for member types
// Member `info`
#include "service_msgs/msg/detail/service_event_info__functions.h"
// Member `request`
// Member `response`
// already included above
// #include "musia_msgs/srv/detail/navigate_to_poi__functions.h"

bool
musia_msgs__srv__NavigateToPOI_Event__init(musia_msgs__srv__NavigateToPOI_Event * msg)
{
  if (!msg) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__init(&msg->info)) {
    musia_msgs__srv__NavigateToPOI_Event__fini(msg);
    return false;
  }
  // request
  if (!musia_msgs__srv__NavigateToPOI_Request__Sequence__init(&msg->request, 0)) {
    musia_msgs__srv__NavigateToPOI_Event__fini(msg);
    return false;
  }
  // response
  if (!musia_msgs__srv__NavigateToPOI_Response__Sequence__init(&msg->response, 0)) {
    musia_msgs__srv__NavigateToPOI_Event__fini(msg);
    return false;
  }
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Event__fini(musia_msgs__srv__NavigateToPOI_Event * msg)
{
  if (!msg) {
    return;
  }
  // info
  service_msgs__msg__ServiceEventInfo__fini(&msg->info);
  // request
  musia_msgs__srv__NavigateToPOI_Request__Sequence__fini(&msg->request);
  // response
  musia_msgs__srv__NavigateToPOI_Response__Sequence__fini(&msg->response);
}

bool
musia_msgs__srv__NavigateToPOI_Event__are_equal(const musia_msgs__srv__NavigateToPOI_Event * lhs, const musia_msgs__srv__NavigateToPOI_Event * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__are_equal(
      &(lhs->info), &(rhs->info)))
  {
    return false;
  }
  // request
  if (!musia_msgs__srv__NavigateToPOI_Request__Sequence__are_equal(
      &(lhs->request), &(rhs->request)))
  {
    return false;
  }
  // response
  if (!musia_msgs__srv__NavigateToPOI_Response__Sequence__are_equal(
      &(lhs->response), &(rhs->response)))
  {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Event__copy(
  const musia_msgs__srv__NavigateToPOI_Event * input,
  musia_msgs__srv__NavigateToPOI_Event * output)
{
  if (!input || !output) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__copy(
      &(input->info), &(output->info)))
  {
    return false;
  }
  // request
  if (!musia_msgs__srv__NavigateToPOI_Request__Sequence__copy(
      &(input->request), &(output->request)))
  {
    return false;
  }
  // response
  if (!musia_msgs__srv__NavigateToPOI_Response__Sequence__copy(
      &(input->response), &(output->response)))
  {
    return false;
  }
  return true;
}

musia_msgs__srv__NavigateToPOI_Event *
musia_msgs__srv__NavigateToPOI_Event__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Event * msg = (musia_msgs__srv__NavigateToPOI_Event *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Event), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__NavigateToPOI_Event));
  bool success = musia_msgs__srv__NavigateToPOI_Event__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__NavigateToPOI_Event__destroy(musia_msgs__srv__NavigateToPOI_Event * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__NavigateToPOI_Event__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__NavigateToPOI_Event__Sequence__init(musia_msgs__srv__NavigateToPOI_Event__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Event * data = NULL;

  if (size) {
    data = (musia_msgs__srv__NavigateToPOI_Event *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__NavigateToPOI_Event), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__NavigateToPOI_Event__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__NavigateToPOI_Event__fini(&data[i - 1]);
      }
      allocator.deallocate(data, allocator.state);
      return false;
    }
  }
  array->data = data;
  array->size = size;
  array->capacity = size;
  return true;
}

void
musia_msgs__srv__NavigateToPOI_Event__Sequence__fini(musia_msgs__srv__NavigateToPOI_Event__Sequence * array)
{
  if (!array) {
    return;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();

  if (array->data) {
    // ensure that data and capacity values are consistent
    assert(array->capacity > 0);
    // finalize all array elements
    for (size_t i = 0; i < array->capacity; ++i) {
      musia_msgs__srv__NavigateToPOI_Event__fini(&array->data[i]);
    }
    allocator.deallocate(array->data, allocator.state);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
  } else {
    // ensure that data, size, and capacity values are consistent
    assert(0 == array->size);
    assert(0 == array->capacity);
  }
}

musia_msgs__srv__NavigateToPOI_Event__Sequence *
musia_msgs__srv__NavigateToPOI_Event__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__NavigateToPOI_Event__Sequence * array = (musia_msgs__srv__NavigateToPOI_Event__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__NavigateToPOI_Event__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__NavigateToPOI_Event__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__NavigateToPOI_Event__Sequence__destroy(musia_msgs__srv__NavigateToPOI_Event__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__NavigateToPOI_Event__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__NavigateToPOI_Event__Sequence__are_equal(const musia_msgs__srv__NavigateToPOI_Event__Sequence * lhs, const musia_msgs__srv__NavigateToPOI_Event__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Event__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__NavigateToPOI_Event__Sequence__copy(
  const musia_msgs__srv__NavigateToPOI_Event__Sequence * input,
  musia_msgs__srv__NavigateToPOI_Event__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__NavigateToPOI_Event);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__NavigateToPOI_Event * data =
      (musia_msgs__srv__NavigateToPOI_Event *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__NavigateToPOI_Event__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__NavigateToPOI_Event__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__NavigateToPOI_Event__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
