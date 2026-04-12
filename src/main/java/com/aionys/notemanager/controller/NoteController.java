package com.aionys.notemanager.controller;

import com.aionys.notemanager.model.dto.note.NoteRequestDto;
import com.aionys.notemanager.model.dto.note.NoteResponseDto;
import com.aionys.notemanager.model.entity.Note;
import com.aionys.notemanager.service.note.INoteService;
import com.aionys.notemanager.service.note.NoteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/notes")
public class  NoteController {

    private final INoteService noteService;

    @Autowired
        public NoteController(INoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteResponseDto>> getAllNotes() {
        return ResponseEntity.ok(noteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponseDto> getSpecifiedNote(@PathVariable Long id) {
        NoteResponseDto noteResponseDto = noteService.findById(id);
        return ResponseEntity.ok(noteResponseDto);
    }

    @PostMapping
    public ResponseEntity<NoteResponseDto> createNote(@RequestBody NoteRequestDto noteRequestDto) {
        NoteResponseDto noteResponseDto = noteService.create(noteRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteResponseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponseDto> updateNote(@PathVariable Long id,
                                           @RequestBody NoteRequestDto noteRequestDto) {
        NoteResponseDto noteResponseDto = noteService.update(id, noteRequestDto);
        return ResponseEntity.ok(noteResponseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Note> deleteNote(@PathVariable Long id) {
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
