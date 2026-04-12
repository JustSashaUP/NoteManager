package com.aionys.notemanager.service.note;

import com.aionys.notemanager.model.dto.note.NoteRequestDto;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;

import java.util.*;

public interface INoteService {
    List<NoteResponseDto> findAll();
    NoteResponseDto findById(long id);
    NoteResponseDto create(NoteRequestDto note);
    NoteResponseDto update(Long id, NoteRequestDto note);
    void delete(Long id);
}
