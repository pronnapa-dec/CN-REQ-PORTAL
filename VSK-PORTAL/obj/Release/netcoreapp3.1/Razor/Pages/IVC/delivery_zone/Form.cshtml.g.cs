#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\IVC\delivery_zone\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8db906fb503c728a55cdc6f3cf249b97454e8f8a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.IVC.delivery_zone.Pages_IVC_delivery_zone_Form), @"mvc.1.0.view", @"/Pages/IVC/delivery_zone/Form.cshtml")]
namespace MIS_PORTAL.Pages.IVC.delivery_zone
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
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8db906fb503c728a55cdc6f3cf249b97454e8f8a", @"/Pages/IVC/delivery_zone/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_IVC_delivery_zone_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8db906fb503c728a55cdc6f3cf249b97454e8f8a4177", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-frm_data"" data-keyboard=""false"" data-backdrop=""static"" tabindex=""-1"">
        <div class=""modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"" role=""document"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h6 class=""modal-title"">เพิ่มข้อมูลบริษัทขนส่งเอกชน</h6>
");
                WriteLiteral(@"                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""kt-portlet__body"">
                        <div class=""form-group form-group-sm row"">
                            <label class=""col-md-2 col-form-label"" align=""right"">พื้นที่</label>
                            <div class=""col-md-4"">
                                <select class=""form-control  select2 zone"" id=""zone"" name=""zone"" style=""width: 100%;"" required>
");
                WriteLiteral(@"                                </select>
                            </div>
                            <label class=""col-md-0 col-form-label"" align=""right"">พื้นที่ย่อย</label>
                            <div class=""col-md-4"">
                                <select class=""form-control  select2 route"" id=""route"" name=""route"" style=""width: 100%;"" required>
");
                WriteLiteral(@"                                </select>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm row"">
                            <label class=""col-md-2 col-form-label check d-none"" align=""right""></label>
                            <div class=""col-md-9 check d-none"">
                                <div class=""col-form alert alert-danger  text-center"" role=""alert"">
                                    <span class=""alert-inner--icon""><i class=""fe fe-info""></i></span>
                                    <span class=""alert-inner--text""><strong>Warning!</strong> ชื่อขนส่งซ้ำ กรุณาเปลี่ยนใหม่!</span>
                                </div>
                            </div>
                            <label class=""col-md-2 col-form-label"" align=""right"">ชื่อบริษัทขนส่งเอกชน</label>
                            <div class=""col-md-9"">
                                <input type=""text"" class=""form-control"" id=""name_transprot"" name=""");
                WriteLiteral(@"name_transprot"" required>
                            </div>
                        </div>

                        <div class=""form-group form-group-sm row bootstrap-timepicker"">
                            <label class=""col-md-2 col-form-label"" align=""right"">เวลาทำการ</label>
                            <div class=""input-group mb-2 col-md-5"">
                                <input id=""opening_time"" type=""time"" class=""form-control event-time-from numbers"" name=""event-time-from"" data-provide=""timepicker"" placeholder=""HH:MM"">&nbsp;&nbsp;
                                <div class=""input-group-prepend"">
                                    <div class=""input-group-text"">ถึง</div>
                                </div>&nbsp;&nbsp;
                                <input id=""close_time"" type=""time"" class=""form-control event-time-from numbers"" name=""event-time-from"" data-provide=""timepicker"" placeholder=""HH:MM"">
                            </div>
                        </div>

                       ");
                WriteLiteral(@" <div class=""form-group form-group-sm row"">
                            <label class=""col-md-2 col-form-label"" align=""right"">หมายเหตุ</label>
                            <div class=""col-md-9"">
                                <textarea class=""form-control"" id=""remark"" rows=""4""></textarea>
                            </div>
                        </div>
                        <div class=""form-group"">
                            <div class=""row"">
                                <div class=""col-md-2"" align=""right"">
                                    <label class=""form-label"">สถานะ</label>
                                </div>
                                <div class=""col-auto"">
                                    <label class=""rdiobox""><input type=""radio"" id=""record_status_1"" class=""record_status"" name=""rdio"" value=""1""> <span class=""tx-success"">ใช้งาน</span></label>
                                </div>
                                <div class=""col-auto"">
                                  ");
                WriteLiteral("  <label class=\"rdiobox\"><input type=\"radio\" id=\"record_status_2\" class=\"record_status\" name=\"rdio\" value=\"0\"");
                BeginWriteAttribute("checked", " checked=\"", 5010, "\"", 5020, 0);
                EndWriteAttribute();
                WriteLiteral(@"> <span class=""tx-danger"">ไม่ใช้งาน</span></label>
                                </div>
                            </div>
                        </div>

                        <div class=""modal-footer"">
                            <button id=""btn-save_exit"" class=""btn ripple btn-primary btn-save_form"" data-action=""save_exit"" type=""submit"" style=""width: 100px;"">บันทึก</button>
                            <button id=""btn-save_new"" class=""btn ripple btn-success btn-save_form"" data-action=""save_new"" type=""submit"" style=""width: 100px;"">บันทึกและสร้างใหม่</button>
                            <button class=""btn ripple btn-danger"" data-dismiss=""modal"" type=""button"" style=""width: 100px;"">ยกเลิก</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Scroll with content modal -->
");
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
            WriteLiteral("\r\n");
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
