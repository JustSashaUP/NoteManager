package com.aionys.notemanager.mapper.note;

import com.aionys.notemanager.model.dto.note.NoteRequestDto;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;
import com.aionys.notemanager.model.entity.Note;

public final class NoteMapper {
    private NoteMapper() {}

    public static NoteResponseDto toDto(Note note) {
        return new NoteResponseDto(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getCreatedAt()
        );
    }

    public static Note toEntity(NoteRequestDto noteRequestDto) {
        return new Note(noteRequestDto.title(), noteRequestDto.content());
    }
}
