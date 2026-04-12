package com.aionys.notemanager.model.dto.note;

import java.time.LocalDateTime;

public record NoteResponseDto(
        Long id,
        String title,
        String content,
        LocalDateTime createdAt
) {
}
