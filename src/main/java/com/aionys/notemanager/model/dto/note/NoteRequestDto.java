package com.aionys.notemanager.model.dto.note;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record NoteRequestDto(
        @NotBlank(message = "Title is required")
        @Pattern(regexp = "^[^A-Za-z]*$", message = "Title must not contain letters")
        String title,
        @Pattern(regexp = "^[^0-9]*$", message = "Content must not contain numbers")
        String content) {
}
