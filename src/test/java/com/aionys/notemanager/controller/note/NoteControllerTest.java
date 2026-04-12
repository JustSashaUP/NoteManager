package com.aionys.notemanager.controller.note;

import com.aionys.notemanager.controller.NoteController;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;
import com.aionys.notemanager.service.note.INoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NoteController.class)
public class NoteControllerTest {
    @MockitoBean
    private INoteService noteService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnAllNotes() throws Exception {
        List<NoteResponseDto> notes = List.of(
                new NoteResponseDto(1L, "title1", "context1", LocalDateTime.now()));

        when(noteService.findAll()).thenReturn(notes);

        mockMvc.perform(get("/notes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }
}

