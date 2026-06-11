// generated from rosidl_generator_c/resource/idl__functions.c.em
// with input from musia_msgs:srv/DetectPerson.idl
// generated code does not contain a copyright notice
#include "musia_msgs/srv/detail/detect_person__functions.h"

#include <assert.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "rcutils/allocator.h"

bool
musia_msgs__srv__DetectPerson_Request__init(musia_msgs__srv__DetectPerson_Request * msg)
{
  if (!msg) {
    return false;
  }
  // structure_needs_at_least_one_member
  return true;
}

void
musia_msgs__srv__DetectPerson_Request__fini(musia_msgs__srv__DetectPerson_Request * msg)
{
  if (!msg) {
    return;
  }
  // structure_needs_at_least_one_member
}

bool
musia_msgs__srv__DetectPerson_Request__are_equal(const musia_msgs__srv__DetectPerson_Request * lhs, const musia_msgs__srv__DetectPerson_Request * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // structure_needs_at_least_one_member
  if (lhs->structure_needs_at_least_one_member != rhs->structure_needs_at_least_one_member) {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Request__copy(
  const musia_msgs__srv__DetectPerson_Request * input,
  musia_msgs__srv__DetectPerson_Request * output)
{
  if (!input || !output) {
    return false;
  }
  // structure_needs_at_least_one_member
  output->structure_needs_at_least_one_member = input->structure_needs_at_least_one_member;
  return true;
}

musia_msgs__srv__DetectPerson_Request *
musia_msgs__srv__DetectPerson_Request__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Request * msg = (musia_msgs__srv__DetectPerson_Request *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Request), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__DetectPerson_Request));
  bool success = musia_msgs__srv__DetectPerson_Request__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__DetectPerson_Request__destroy(musia_msgs__srv__DetectPerson_Request * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__DetectPerson_Request__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__DetectPerson_Request__Sequence__init(musia_msgs__srv__DetectPerson_Request__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Request * data = NULL;

  if (size) {
    data = (musia_msgs__srv__DetectPerson_Request *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__DetectPerson_Request), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__DetectPerson_Request__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__DetectPerson_Request__fini(&data[i - 1]);
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
musia_msgs__srv__DetectPerson_Request__Sequence__fini(musia_msgs__srv__DetectPerson_Request__Sequence * array)
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
      musia_msgs__srv__DetectPerson_Request__fini(&array->data[i]);
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

musia_msgs__srv__DetectPerson_Request__Sequence *
musia_msgs__srv__DetectPerson_Request__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Request__Sequence * array = (musia_msgs__srv__DetectPerson_Request__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Request__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__DetectPerson_Request__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__DetectPerson_Request__Sequence__destroy(musia_msgs__srv__DetectPerson_Request__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__DetectPerson_Request__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__DetectPerson_Request__Sequence__are_equal(const musia_msgs__srv__DetectPerson_Request__Sequence * lhs, const musia_msgs__srv__DetectPerson_Request__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Request__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Request__Sequence__copy(
  const musia_msgs__srv__DetectPerson_Request__Sequence * input,
  musia_msgs__srv__DetectPerson_Request__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__DetectPerson_Request);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__DetectPerson_Request * data =
      (musia_msgs__srv__DetectPerson_Request *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__DetectPerson_Request__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__DetectPerson_Request__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Request__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}


bool
musia_msgs__srv__DetectPerson_Response__init(musia_msgs__srv__DetectPerson_Response * msg)
{
  if (!msg) {
    return false;
  }
  // person_detected
  // distance_m
  // confidence
  return true;
}

void
musia_msgs__srv__DetectPerson_Response__fini(musia_msgs__srv__DetectPerson_Response * msg)
{
  if (!msg) {
    return;
  }
  // person_detected
  // distance_m
  // confidence
}

bool
musia_msgs__srv__DetectPerson_Response__are_equal(const musia_msgs__srv__DetectPerson_Response * lhs, const musia_msgs__srv__DetectPerson_Response * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  // person_detected
  if (lhs->person_detected != rhs->person_detected) {
    return false;
  }
  // distance_m
  if (lhs->distance_m != rhs->distance_m) {
    return false;
  }
  // confidence
  if (lhs->confidence != rhs->confidence) {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Response__copy(
  const musia_msgs__srv__DetectPerson_Response * input,
  musia_msgs__srv__DetectPerson_Response * output)
{
  if (!input || !output) {
    return false;
  }
  // person_detected
  output->person_detected = input->person_detected;
  // distance_m
  output->distance_m = input->distance_m;
  // confidence
  output->confidence = input->confidence;
  return true;
}

musia_msgs__srv__DetectPerson_Response *
musia_msgs__srv__DetectPerson_Response__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Response * msg = (musia_msgs__srv__DetectPerson_Response *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Response), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__DetectPerson_Response));
  bool success = musia_msgs__srv__DetectPerson_Response__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__DetectPerson_Response__destroy(musia_msgs__srv__DetectPerson_Response * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__DetectPerson_Response__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__DetectPerson_Response__Sequence__init(musia_msgs__srv__DetectPerson_Response__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Response * data = NULL;

  if (size) {
    data = (musia_msgs__srv__DetectPerson_Response *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__DetectPerson_Response), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__DetectPerson_Response__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__DetectPerson_Response__fini(&data[i - 1]);
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
musia_msgs__srv__DetectPerson_Response__Sequence__fini(musia_msgs__srv__DetectPerson_Response__Sequence * array)
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
      musia_msgs__srv__DetectPerson_Response__fini(&array->data[i]);
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

musia_msgs__srv__DetectPerson_Response__Sequence *
musia_msgs__srv__DetectPerson_Response__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Response__Sequence * array = (musia_msgs__srv__DetectPerson_Response__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Response__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__DetectPerson_Response__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__DetectPerson_Response__Sequence__destroy(musia_msgs__srv__DetectPerson_Response__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__DetectPerson_Response__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__DetectPerson_Response__Sequence__are_equal(const musia_msgs__srv__DetectPerson_Response__Sequence * lhs, const musia_msgs__srv__DetectPerson_Response__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Response__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Response__Sequence__copy(
  const musia_msgs__srv__DetectPerson_Response__Sequence * input,
  musia_msgs__srv__DetectPerson_Response__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__DetectPerson_Response);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__DetectPerson_Response * data =
      (musia_msgs__srv__DetectPerson_Response *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__DetectPerson_Response__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__DetectPerson_Response__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Response__copy(
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
// #include "musia_msgs/srv/detail/detect_person__functions.h"

bool
musia_msgs__srv__DetectPerson_Event__init(musia_msgs__srv__DetectPerson_Event * msg)
{
  if (!msg) {
    return false;
  }
  // info
  if (!service_msgs__msg__ServiceEventInfo__init(&msg->info)) {
    musia_msgs__srv__DetectPerson_Event__fini(msg);
    return false;
  }
  // request
  if (!musia_msgs__srv__DetectPerson_Request__Sequence__init(&msg->request, 0)) {
    musia_msgs__srv__DetectPerson_Event__fini(msg);
    return false;
  }
  // response
  if (!musia_msgs__srv__DetectPerson_Response__Sequence__init(&msg->response, 0)) {
    musia_msgs__srv__DetectPerson_Event__fini(msg);
    return false;
  }
  return true;
}

void
musia_msgs__srv__DetectPerson_Event__fini(musia_msgs__srv__DetectPerson_Event * msg)
{
  if (!msg) {
    return;
  }
  // info
  service_msgs__msg__ServiceEventInfo__fini(&msg->info);
  // request
  musia_msgs__srv__DetectPerson_Request__Sequence__fini(&msg->request);
  // response
  musia_msgs__srv__DetectPerson_Response__Sequence__fini(&msg->response);
}

bool
musia_msgs__srv__DetectPerson_Event__are_equal(const musia_msgs__srv__DetectPerson_Event * lhs, const musia_msgs__srv__DetectPerson_Event * rhs)
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
  if (!musia_msgs__srv__DetectPerson_Request__Sequence__are_equal(
      &(lhs->request), &(rhs->request)))
  {
    return false;
  }
  // response
  if (!musia_msgs__srv__DetectPerson_Response__Sequence__are_equal(
      &(lhs->response), &(rhs->response)))
  {
    return false;
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Event__copy(
  const musia_msgs__srv__DetectPerson_Event * input,
  musia_msgs__srv__DetectPerson_Event * output)
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
  if (!musia_msgs__srv__DetectPerson_Request__Sequence__copy(
      &(input->request), &(output->request)))
  {
    return false;
  }
  // response
  if (!musia_msgs__srv__DetectPerson_Response__Sequence__copy(
      &(input->response), &(output->response)))
  {
    return false;
  }
  return true;
}

musia_msgs__srv__DetectPerson_Event *
musia_msgs__srv__DetectPerson_Event__create(void)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Event * msg = (musia_msgs__srv__DetectPerson_Event *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Event), allocator.state);
  if (!msg) {
    return NULL;
  }
  memset(msg, 0, sizeof(musia_msgs__srv__DetectPerson_Event));
  bool success = musia_msgs__srv__DetectPerson_Event__init(msg);
  if (!success) {
    allocator.deallocate(msg, allocator.state);
    return NULL;
  }
  return msg;
}

void
musia_msgs__srv__DetectPerson_Event__destroy(musia_msgs__srv__DetectPerson_Event * msg)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (msg) {
    musia_msgs__srv__DetectPerson_Event__fini(msg);
  }
  allocator.deallocate(msg, allocator.state);
}


bool
musia_msgs__srv__DetectPerson_Event__Sequence__init(musia_msgs__srv__DetectPerson_Event__Sequence * array, size_t size)
{
  if (!array) {
    return false;
  }
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Event * data = NULL;

  if (size) {
    data = (musia_msgs__srv__DetectPerson_Event *)allocator.zero_allocate(size, sizeof(musia_msgs__srv__DetectPerson_Event), allocator.state);
    if (!data) {
      return false;
    }
    // initialize all array elements
    size_t i;
    for (i = 0; i < size; ++i) {
      bool success = musia_msgs__srv__DetectPerson_Event__init(&data[i]);
      if (!success) {
        break;
      }
    }
    if (i < size) {
      // if initialization failed finalize the already initialized array elements
      for (; i > 0; --i) {
        musia_msgs__srv__DetectPerson_Event__fini(&data[i - 1]);
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
musia_msgs__srv__DetectPerson_Event__Sequence__fini(musia_msgs__srv__DetectPerson_Event__Sequence * array)
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
      musia_msgs__srv__DetectPerson_Event__fini(&array->data[i]);
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

musia_msgs__srv__DetectPerson_Event__Sequence *
musia_msgs__srv__DetectPerson_Event__Sequence__create(size_t size)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  musia_msgs__srv__DetectPerson_Event__Sequence * array = (musia_msgs__srv__DetectPerson_Event__Sequence *)allocator.allocate(sizeof(musia_msgs__srv__DetectPerson_Event__Sequence), allocator.state);
  if (!array) {
    return NULL;
  }
  bool success = musia_msgs__srv__DetectPerson_Event__Sequence__init(array, size);
  if (!success) {
    allocator.deallocate(array, allocator.state);
    return NULL;
  }
  return array;
}

void
musia_msgs__srv__DetectPerson_Event__Sequence__destroy(musia_msgs__srv__DetectPerson_Event__Sequence * array)
{
  rcutils_allocator_t allocator = rcutils_get_default_allocator();
  if (array) {
    musia_msgs__srv__DetectPerson_Event__Sequence__fini(array);
  }
  allocator.deallocate(array, allocator.state);
}

bool
musia_msgs__srv__DetectPerson_Event__Sequence__are_equal(const musia_msgs__srv__DetectPerson_Event__Sequence * lhs, const musia_msgs__srv__DetectPerson_Event__Sequence * rhs)
{
  if (!lhs || !rhs) {
    return false;
  }
  if (lhs->size != rhs->size) {
    return false;
  }
  for (size_t i = 0; i < lhs->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Event__are_equal(&(lhs->data[i]), &(rhs->data[i]))) {
      return false;
    }
  }
  return true;
}

bool
musia_msgs__srv__DetectPerson_Event__Sequence__copy(
  const musia_msgs__srv__DetectPerson_Event__Sequence * input,
  musia_msgs__srv__DetectPerson_Event__Sequence * output)
{
  if (!input || !output) {
    return false;
  }
  if (output->capacity < input->size) {
    const size_t allocation_size =
      input->size * sizeof(musia_msgs__srv__DetectPerson_Event);
    rcutils_allocator_t allocator = rcutils_get_default_allocator();
    musia_msgs__srv__DetectPerson_Event * data =
      (musia_msgs__srv__DetectPerson_Event *)allocator.reallocate(
      output->data, allocation_size, allocator.state);
    if (!data) {
      return false;
    }
    // If reallocation succeeded, memory may or may not have been moved
    // to fulfill the allocation request, invalidating output->data.
    output->data = data;
    for (size_t i = output->capacity; i < input->size; ++i) {
      if (!musia_msgs__srv__DetectPerson_Event__init(&output->data[i])) {
        // If initialization of any new item fails, roll back
        // all previously initialized items. Existing items
        // in output are to be left unmodified.
        for (; i-- > output->capacity; ) {
          musia_msgs__srv__DetectPerson_Event__fini(&output->data[i]);
        }
        return false;
      }
    }
    output->capacity = input->size;
  }
  output->size = input->size;
  for (size_t i = 0; i < input->size; ++i) {
    if (!musia_msgs__srv__DetectPerson_Event__copy(
        &(input->data[i]), &(output->data[i])))
    {
      return false;
    }
  }
  return true;
}
