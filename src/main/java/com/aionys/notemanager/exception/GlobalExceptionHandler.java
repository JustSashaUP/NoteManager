package com.aionys.notemanager.exception;

import com.aionys.notemanager.model.entity.Note;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handleException(ApiException ex) {
        Map<String, Object> body = new HashMap<>();

        body.put("code", ex.getErrorCode());
        body.put("message", ex.getErrorMessage());

        return ResponseEntity
                .status(ex.getHttpStatus())
                .body(body);
    }
}
