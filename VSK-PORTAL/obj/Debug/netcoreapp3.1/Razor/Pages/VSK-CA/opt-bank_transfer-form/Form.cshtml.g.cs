#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-CA\opt-bank_transfer-form\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "94bc8d952d5f21dd6a0680cedcb4ca423df5df94"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_CA.opt_bank_transfer_form.Pages_VSK_CA_opt_bank_transfer_form_Form), @"mvc.1.0.view", @"/Pages/VSK-CA/opt-bank_transfer-form/Form.cshtml")]
namespace MIS_PORTAL.Pages.VSK_CA.opt_bank_transfer_form
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"94bc8d952d5f21dd6a0680cedcb4ca423df5df94", @"/Pages/VSK-CA/opt-bank_transfer-form/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_CA_opt_bank_transfer_form_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("detectImageForm"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "94bc8d952d5f21dd6a0680cedcb4ca423df5df944298", async() => {
                WriteLiteral("\r\n    <div class=\"modal effect-flip-vertical\" id=\"modal-frm_data\" data-keyboard=\"false\" data-backdrop=\"static\">\r\n        <div class=\"modal-dialog modal-dialog-scrollable modal-dialog-centered\" role=\"document\" ");
                WriteLiteral(@">
            <div class=""modal-content modal-content-demo"" style=""width:1250px;height:1250px;"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">นำเข้าสลิปเงินโอน</h6><button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-md-6"">
                            <div class=""form-group "">
                                <div class=""row"">
");
                WriteLiteral(@"                                    <div class=""col-md-12"">
                                        <label class=""form-label"">ไฟล์สลิปเงินโอน <span class=""tx-danger"">*</span></label>
                                        <div class=""custom-file mt-2"">
");
                WriteLiteral(@"                                            <input type=""file"" class=""dropify"" accept="".jpg, .png, image/jpeg, image/png"" data-height=""380"" id=""imageFile"" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class=""col-md-6"">

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">วัน/เวลา โอน <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <input type=""text"" class=""form-control"" id=""ref_datetime"" name=""ref_datetime""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2524, "\"", 2538, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 2539, "\"", 2550, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                                    </div>

                                </div>
                            </div>

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">รหัสอ้างอิง <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <input type=""text"" class=""form-control"" id=""ref_code"" name=""ref_code""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3186, "\"", 3200, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 3201, "\"", 3212, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">จาก <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <input type=""text"" class=""form-control"" id=""ref_start"" name=""ref_start""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3840, "\"", 3854, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 3855, "\"", 3866, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">ไปยัง <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <input type=""text"" class=""form-control"" id=""ref_target"" name=""ref_target""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4498, "\"", 4512, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 4513, "\"", 4524, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">จำนวน/บาท <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <input type=""text"" class=""form-control numbers"" id=""ref_total"" name=""ref_total""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5166, "\"", 5180, 0);
                EndWriteAttribute();
                BeginWriteAttribute("required", " required=\"", 5181, "\"", 5192, 0);
                EndWriteAttribute();
                WriteLiteral(@" data-parsley-type=""number""  disabled >
                                    </div>
                                </div>
                            </div>

                            <div class=""form-group "">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">ข้อความทั้งหมด <span class=""tx-danger""></span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <textarea class=""form-control"" id=""text_raw"" name=""text_raw"" rows=""7""");
                BeginWriteAttribute("placeholder", "  placeholder=\"", 5857, "\"", 5872, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class=""form-group d-none"">
                                <div class=""row"">
                                    <div class=""col-md-3"">
                                        <label class=""form-label"">verified <span class=""tx-danger"">*</span></label>
                                    </div>
                                    <div class=""col-md-9"">
                                        <textarea class=""form-control"" id=""result"" rows=""20""></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class=""modal-footer"">
                    <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""button");
                WriteLiteral("\">Save</button>\r\n                    <button class=\"btn ripple btn-secondary\" data-dismiss=\"modal\" type=\"button\">Close</button>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!--End Scroll with content modal -->\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
