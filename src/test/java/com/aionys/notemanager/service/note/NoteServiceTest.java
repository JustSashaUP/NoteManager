package com.aionys.notemanager.service.note;

import com.aionys.notemanager.exception.ApiException;
import com.aionys.notemanager.model.dto.note.NoteRequestDto;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;
import com.aionys.notemanager.model.entity.Note;
import com.aionys.notemanager.repository.note.INoteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NoteServiceTest {
    @Mock
    private INoteRepository noteRepository;

    @InjectMocks
    private NoteServiceImpl noteService;

    @Test
    void shouldReturnNoteById() {
        Note note = new Note("title", "content");
        note.setId(1L);

        when(noteRepository.findById(1L))
                .thenReturn(Optional.of(note));

        NoteResponseDto result = noteService.findById(note.getId());

        assertEquals("title", result.title());
        assertEquals("content", result.content());
    }

    @Test
    void shouldThrowApiExceptionWhenNoteNotFound() {
        when(noteRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ApiException.class, () -> noteService.findById(1L));
    }

    @Test
    void shouldCreateNote() {
        NoteRequestDto noteRequestDto =
                new NoteRequestDto("title", "content");

        Note createdNote = new Note("title", "content");
        createdNote.setId(1L);

        when(noteRepository.save(any(Note.class))).thenReturn(createdNote);

        NoteResponseDto result = noteService.create(noteRequestDto);

        assertNotNull(result);
        assertEquals(1L, result.id());
    }
}
