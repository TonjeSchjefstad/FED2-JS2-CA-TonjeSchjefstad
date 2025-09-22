export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function validatePostData({ title, body, media }) {
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!body || body.trim().length === 0) {
    errors.push("body is required");
  }

  if (media) {
    const url = typeof media === "string" ? media : media.url;
    if (url && !isValidUrl(url.trim())) {
      errors.push("Invalid media URL format");
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

export function validateProfileData(profileData) {
  const errors = [];

  if (profileData.avatar && profileData.avatar.url) {
    if (!isValidUrl(profileData.avatar.url)) {
      errors.push("Avatar URL must be a valid URL");
    }
  }

  if (profileData.banner && profileData.banner.url) {
    if (!isValidUrl(profileData.banner.url)) {
      errors.push("Banner URL must be a valid URL");
    }
  }

  if (profileData.bio && profileData.bio.length > 160) {
    errors.push("Bio must be 160 characters or less");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}