import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue }) {
    return (
        <div className="w-full flex flex-col items-start">
            {label && (
                <label className="mb-1.5 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            
            <div className="w-full rounded-lg border border-gray-300 shadow-sm overflow-hidden transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/50">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey={import.meta.env.VITE_TINYAPIKEY}
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                branding: false, 
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "wordcount",
                                    "help",
                                ],
                                toolbar:
                                    "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                
                                content_style: `
                                    body { 
                                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                                        font-size: 15px; 
                                        line-height: 1.6;
                                        color: #1f2937;
                                        padding: 0.5rem;
                                    }
                                    body::before {
                                        color: #9ca3af;
                                    }
                                `,
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
}