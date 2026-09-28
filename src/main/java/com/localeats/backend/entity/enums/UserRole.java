package com.localeats.backend.entity.enums;

/**
 * Khớp với PostgreSQL native enum type "user_role" đã tạo trong DDL.
 * Lưu ý: KHÔNG có giá trị "store_owner" — một User (role=USER) trở thành
 * Chủ quán bằng cách có thêm 1 dòng trong bảng store_owner_profile,
 * không phải bằng cách đổi role (đúng theo Business Rule BR-S01).
 */
public enum UserRole {
    user,
    staff,
    admin
}
