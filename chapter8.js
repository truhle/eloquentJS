// make an unreliable function reliable via error handling

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b)
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure)
      return reliableMultiply(a, b);
    else
      throw e;
  }
}

// a looping version of reliableMultiply

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure))
        throw e;
    }
  }
}

// code to ensure a box is locked after unlocking the box and calling a function that raises an error

function withBoxUnlocked(body) {
  try {
    box.unlock();
    return body();
  } finally {
    box.lock();
  }
}

// a version that returns the box to the state that it was in before the function was called

function withBoxUnlocked(body) {
  var locked = box.locked;
  if (!locked)
    return body();

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}
